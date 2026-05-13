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

## The tournament — two stages

1. **Round-robin** — every bot plays every other bot once. Your total score across all matches determines your **seed**.
2. **Seeded knockout** — top seeds get byes when the field size isn't a power of 2. Pairings are highest-seed-vs-lowest-seed each round. Last bot standing in the bracket wins.

## What you do

1. Open `bot.js`.
2. Change `NAME` to something distinctive.
3. Rewrite `getMove(myHistory, opponentHistory)` to play well.
4. Test with `node runner.js` — runs your bot against the reference strategies and prints a leaderboard.
5. When happy, rename your file to `bot_<yourname>.js` and submit.

## Constraints

- No external state (no localStorage, no files, no network).
- Your move function must return in under 50ms. Slower than that → counted as `D`.
- Throws or invalid returns → counted as `D`.
- Reference bots live in `reference_bots.js`. They're there to test against — they aren't the strategies that will necessarily win.

## Tips

- Research is allowed. The literature on the iterated prisoner's dilemma is 75 years deep — use it.
- The runner is local and free. Iterate quickly against the references before you submit.
- More tokens spent ≠ smarter bot. Some of the strongest strategies in IPD history are 3-4 lines of code.

## Prize

**Tournament champion** — last bot standing in the seeded knockout. Glory, bragging rights, and the satisfaction of beating your colleagues.
