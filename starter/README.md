# Iterated Prisoner's Dilemma — Bot Tournament

You have **60 minutes** to write a bot that plays IPD against everyone else's bots. AI tooling only — every line through Copilot or Cline.

## The game

Each round, you choose `'C'` (cooperate) or `'D'` (defect). Your opponent does the same. Payoffs:

| You | Opponent | Your points | Their points |
|-----|----------|-------------|--------------|
| C   | C        | 3           | 3            |
| D   | C        | 5           | 0            |
| C   | D        | 0           | 5            |
| D   | D        | 1           | 1            |

You play 200 rounds per match.

## The tournament — two competitions, two prizes

1. **🏆 Axelrod Cup** — round-robin. Every bot plays every other bot once. Highest total points wins. (Robert Axelrod's 1980 framing — cooperation tends to pay across a wide field.)
2. **👑 Last Bot Standing** — single-elimination bracket seeded by the Axelrod Cup standings. Top seeds get byes when the field isn't a power of 2. In 1v1 the maths flips: a pure defector usually edges a pure cooperator by ~5 points, so the bracket often rewards a more aggressive bot.

Decide which crown you're chasing, or try to take both.

## What you do

1. Open `bot.js`.
2. Change `NAME` to something distinctive.
3. Rewrite `getMove(myHistory, opponentHistory)` to play well.
4. Test with `node runner.js` — runs your bot against the reference strategies and prints a leaderboard.
5. When happy, rename your file to `bot_<yourname>.js` and post it in the workshop Microsoft Teams channel. One file per person — that's the submission.

## Constraints

- No external state (no localStorage, no files, no network).
- Your move function must return in under 50ms. Slower than that → counted as `D`.
- Throws or invalid returns → counted as `D`.
- Reference bots live in `reference_bots.js`. They're there to test against — they aren't the strategies that will necessarily win.

## Tips

- Research is allowed. The literature on the iterated prisoner's dilemma is 75 years deep — use it.
- The runner is local and free. Iterate quickly against the references before you submit.
- More tokens spent ≠ smarter bot. Some of the strongest strategies in IPD history are 3-4 lines of code.

## Prizes

- **🏆 Axelrod Cup** — top of the round-robin leaderboard.
- **👑 Last Bot Standing** — last bot left in the knockout bracket.

Glory, bragging rights, and the satisfaction of beating your colleagues — twice.
