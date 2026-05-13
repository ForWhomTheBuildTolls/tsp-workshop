# Iterated Prisoner's Dilemma — Workshop Bot Tournament

A 60-minute coding challenge: write a bot that plays the [Iterated Prisoner's Dilemma](https://en.wikipedia.org/wiki/Prisoner%27s_dilemma#The_iterated_prisoner's_dilemma), submit it to a live tournament, and find out whether your strategy survives.

This repo contains the starter pack participants need to write and test their bot.

## Quick start

```bash
git clone https://github.com/<your-username>/tsp-workshop.git
cd tsp-workshop/starter

# Test your bot locally against the reference strategies
node runner.js
```

Then open `starter/bot.js`, edit the `getMove` function, and re-run.

## What's in here

```
tsp-workshop/
└── starter/                     ← what participants edit and submit
    ├── bot.js                   ← the file you change
    ├── reference_bots.js        ← 8 classic strategies for testing
    ├── runner.js                ← Node CLI: runs your bot vs the references
    └── README.md                ← detailed instructions
```

## The game

Each round, you choose `C` (cooperate) or `D` (defect). Your opponent does the same, at the same time, without knowing your choice.

| You | Opponent | You get | They get |
|-----|----------|---------|----------|
| C   | C        | 3       | 3        |
| D   | C        | 5       | 0        |
| C   | D        | 0       | 5        |
| D   | D        | 1       | 1        |

Defecting always pays more in a single round — whatever they do. But matches are 200 rounds, and your bot remembers everything. Your move now affects how the opponent treats you later.

## The tournament

Two stages:

1. **Round-robin** — every bot plays every other bot. Total points determines your seed.
2. **Seeded knockout** — top seeds get byes; pairings are highest-seed-vs-lowest-seed each round. Last bot standing wins.

## How to write a bot

Open `starter/bot.js`. You're implementing one function:

```javascript
function getMove(myHistory, opponentHistory) {
  // myHistory and opponentHistory are arrays of 'C' and 'D'
  // Both empty on round 1
  // Return 'C' or 'D'

  return 'C'; // replace this
}
```

That's the whole API.

## Testing locally

```bash
# Your bot vs all 8 reference bots
node runner.js
```

The reference bots are 8 classic IPD strategies. They're there to validate your bot, not to forecast how you'll rank on the day — the actual tournament field will be different.

## Rules

- AI only — no hand-coding (the workshop's specific rule, may not apply if you found this repo organically)
- Single file, must export `NAME` and `getMove`
- `getMove` must return in under 50ms
- Must return exactly `'C'` or `'D'`
- No external state (no localStorage, no files, no network)

## Research is encouraged

The literature on IPD is 75 years deep. Read it. The original work was Robert Axelrod's 1980 tournament, but plenty has been written since then.

## License

MIT — do what you want with it.
