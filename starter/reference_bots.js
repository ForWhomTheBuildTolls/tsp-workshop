/* Reference bots — classic IPD strategies.
   Participants test against these locally. They also appear in the
   final tournament as fixed opponents so even small groups get a
   meaningful leaderboard. */

const referenceBots = [
  {
    NAME: "AlwaysCooperate",
    getMove: () => 'C',
  },
  {
    NAME: "AlwaysDefect",
    getMove: () => 'D',
  },
  {
    NAME: "Random",
    getMove: () => Math.random() < 0.5 ? 'C' : 'D',
  },
  {
    NAME: "TitForTat",
    // Cooperate first, then copy opponent's last move.
    getMove: (mine, opp) => opp.length === 0 ? 'C' : opp[opp.length - 1],
  },
  {
    NAME: "SuspiciousTitForTat",
    // Same as TFT but defects first.
    getMove: (mine, opp) => opp.length === 0 ? 'D' : opp[opp.length - 1],
  },
  {
    NAME: "GrimTrigger",
    // Cooperate until first defection, then defect forever.
    getMove: (mine, opp) => opp.includes('D') ? 'D' : 'C',
  },
  {
    NAME: "TitForTwoTats",
    // Defects only if opponent defected twice in a row — forgiving.
    getMove: (mine, opp) => {
      if (opp.length < 2) return 'C';
      return (opp[opp.length - 1] === 'D' && opp[opp.length - 2] === 'D') ? 'D' : 'C';
    },
  },
  {
    NAME: "Pavlov",
    // Win-stay, lose-shift.
    getMove: (mine, opp) => {
      if (mine.length === 0) return 'C';
      const i = mine.length - 1;
      const good = (mine[i] === 'C' && opp[i] === 'C') ||
                   (mine[i] === 'D' && opp[i] === 'C');
      if (good) return mine[i];
      return mine[i] === 'C' ? 'D' : 'C';
    },
  },
];

module.exports = referenceBots;
