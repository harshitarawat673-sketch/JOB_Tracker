const Application = require("../models/Application");

exports.getInsights = async (req, res) => {

  const apps = await Application.find({
    user: req.user.id
  });

  const total = apps.length;

  const responded = apps.filter(app =>
    app.status !== "Applied"
  ).length;

  const responseRate =
    total === 0
      ? 0
      : ((responded / total) * 100).toFixed(2);

  let totalDays = 0;
  let transitions = 0;

  apps.forEach(app => {

    for (let i = 1; i < app.timeline.length; i++) {

      const prev = new Date(app.timeline[i - 1].date);
      const curr = new Date(app.timeline[i].date);

      const diff =
        (curr - prev) / (1000 * 60 * 60 * 24);

      totalDays += diff;
      transitions++;
    }
  });

  const avgTimeBetweenStages =
    transitions === 0
      ? 0
      : (totalDays / transitions).toFixed(2);

  res.json({
    totalApplications: total,
    responseRate: `${responseRate}%`,
    avgTimeBetweenStages:
      `${avgTimeBetweenStages} days`
  });
};