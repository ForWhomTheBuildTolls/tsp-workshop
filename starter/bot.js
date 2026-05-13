/* ============================================================
   YOUR BOT — Iterated Prisoner's Dilemma
   ============================================================

   Edit this file. Rename it to bot_<your-name>.js when you submit.

   THE GAME
   --------
   You play 200 rounds per match. Each round, you and your opponent
   simultaneously choose:
     'C' — Cooperate
     'D' — Defect

   Scoring per round (your score / opponent score):
     Both Cooperate    →  3 / 3   (reward for mutual cooperation)
     You D, them C     →  5 / 0   (temptation — you exploit)
     You C, them D     →  0 / 5   (sucker — you got exploited)
     Both Defect       →  1 / 1   (punishment for mutual defection)

   THE TOURNAMENT
   --------------
   Two stages:
     1. Round-robin — every bot plays every other bot. Total points
        determines your seed.
     2. Seeded knockout — top seeds get byes. Highest seed plays lowest
        seed each round. Last bot standing wins.

   THE FUNCTION
   ------------
   Implement getMove(myHistory, opponentHistory).
   - myHistory: array of your past moves this match, e.g. ['C', 'D', 'C']
   - opponentHistory: array of opponent's past moves, same length
   - On the first round both arrays are empty ([]).
   - Return 'C' or 'D'.

   That's the whole API. Don't change the function name or signature.

   ============================================================
*/

const NAME = "MyBot"; // <-- change this to your name / team name

function getMove(myHistory, opponentHistory) {

  // Replace this with your strategy.
  return 'C';

}

// Don't touch — the runner reads these:
module.exports = { NAME, getMove };
