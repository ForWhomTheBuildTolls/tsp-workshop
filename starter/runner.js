#!/usr/bin/env node
/* ============================================================
   IPD Tournament Runner
   ============================================================

   Usage:
     node runner.js                  — runs your bot.js vs the reference bots
     node runner.js submissions/     — runs ALL bots in submissions/ + references

   The runner is bulletproof: if a bot throws, returns garbage, or
   times out, it's penalised, not crashed. The leaderboard still
   prints.
   ============================================================ */

const fs = require('fs');
const path = require('path');

// Game constants
const ROUNDS_PER_MATCH = 200;
const PAYOFFS = {
  'CC': [3, 3], 'CD': [0, 5], 'DC': [5, 0], 'DD': [1, 1],
};
const MOVE_TIMEOUT_MS = 50; // any single move slower than this = 'D' fallback

// ---------- Bot loading ----------
function loadBot(filepath) {
  try {
    // Force reload to avoid require cache between runs
    delete require.cache[require.resolve(filepath)];
    const mod = require(filepath);
    if (typeof mod.getMove !== 'function' || typeof mod.NAME !== 'string') {
      return { NAME: path.basename(filepath), getMove: () => 'D', broken: 'missing NAME or getMove' };
    }
    return mod;
  } catch (err) {
    return { NAME: path.basename(filepath), getMove: () => 'D', broken: err.message };
  }
}

function loadFromDir(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.js'))
    .map(f => loadBot(path.resolve(dir, f)));
}

// ---------- Safe move ----------
function safeMove(bot, mine, opp) {
  try {
    const start = Date.now();
    const m = bot.getMove(mine.slice(), opp.slice());
    if (Date.now() - start > MOVE_TIMEOUT_MS) {
      bot._timeouts = (bot._timeouts || 0) + 1;
      return 'D';
    }
    if (m !== 'C' && m !== 'D') {
      bot._invalid = (bot._invalid || 0) + 1;
      return 'D';
    }
    return m;
  } catch (err) {
    bot._threw = bot._threw || err.message;
    return 'D';
  }
}

// ---------- Single match ----------
function playMatch(a, b, rounds = ROUNDS_PER_MATCH) {
  const ha = [], hb = [];
  let sa = 0, sb = 0;
  for (let i = 0; i < rounds; i++) {
    const ma = safeMove(a, ha, hb);
    const mb = safeMove(b, hb, ha);
    const [pa, pb] = PAYOFFS[ma + mb];
    sa += pa; sb += pb;
    ha.push(ma); hb.push(mb);
  }
  return { sa, sb };
}

// ---------- Tournament ----------
function tournament(bots) {
  const scores = new Map(bots.map(b => [b.NAME, 0]));
  const matches = [];

  for (let i = 0; i < bots.length; i++) {
    for (let j = i + 1; j < bots.length; j++) {
      const { sa, sb } = playMatch(bots[i], bots[j]);
      scores.set(bots[i].NAME, scores.get(bots[i].NAME) + sa);
      scores.set(bots[j].NAME, scores.get(bots[j].NAME) + sb);
      matches.push({ a: bots[i].NAME, b: bots[j].NAME, sa, sb });
    }
  }

  // Also play each bot against itself once (so symmetric strategies still get rated)
  for (const b of bots) {
    const { sa, sb } = playMatch(b, b);
    scores.set(b.NAME, scores.get(b.NAME) + sa + sb);
  }

  return { scores, matches };
}

// ---------- Pretty print ----------
function printLeaderboard(scores, bots) {
  const ranked = [...scores.entries()].sort((a, b) => b[1] - a[1]);
  const maxName = Math.max(...ranked.map(([n]) => n.length), 14);
  const maxScore = ranked[0][1];

  console.log('');
  console.log(' RANK  ' + 'BOT'.padEnd(maxName + 2) + 'SCORE'.padStart(8) + '   BAR');
  console.log(' ' + '─'.repeat(maxName + 35));

  ranked.forEach(([name, score], i) => {
    const bot = bots.find(b => b.NAME === name);
    const hasIssue = bot && (bot.broken || bot._threw || bot._invalid || bot._timeouts);
    const broken = hasIssue ? ' ⚠' : '  ';
    const rank = String(i + 1).padStart(3);
    const bar = '█'.repeat(Math.round(40 * score / maxScore));
    console.log(` ${rank}.${broken}${name.padEnd(maxName + 2)}${String(score).padStart(8)}   ${bar}`);
  });

  // Issues note
  const issues = bots.filter(b => b.broken || b._threw || b._invalid || b._timeouts);
  if (issues.length) {
    console.log('');
    console.log(' ⚠  Bots with issues (defaulted to defect on bad moves):');
    issues.forEach(b => {
      const parts = [];
      if (b.broken) parts.push(`load error: ${b.broken}`);
      if (b._threw) parts.push(`threw: ${b._threw}`);
      if (b._invalid) parts.push(`${b._invalid} invalid returns`);
      if (b._timeouts) parts.push(`${b._timeouts} timeouts`);
      console.log(`    ${b.NAME}: ${parts.join(', ')}`);
    });
  }
  console.log('');
}

// ---------- Entry ----------
function main() {
  const arg = process.argv[2];
  const references = require('./reference_bots');
  let bots;

  if (arg) {
    const submitted = loadFromDir(arg);
    console.log(`\n Tournament mode: ${submitted.length} submitted bots + ${references.length} reference bots\n`);
    bots = [...submitted, ...references];
  } else {
    const own = loadBot(path.resolve(__dirname, './bot.js'));
    console.log(`\n Test mode: "${own.NAME}" vs reference bots\n`);
    bots = [own, ...references];
  }

  const t0 = Date.now();
  const { scores } = tournament(bots);
  const elapsed = ((Date.now() - t0) / 1000).toFixed(2);

  printLeaderboard(scores, bots);
  console.log(` Played ${bots.length * (bots.length - 1) / 2 + bots.length} matches in ${elapsed}s.\n`);
}

if (require.main === module) main();
