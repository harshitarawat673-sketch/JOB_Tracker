const Application = require("../models/Application");
const exportCSV = require("../utils/csvExport");
const exportPDF = require("../utils/pdfExport");

exports.createApplication = async (req, res) => {

  try {

    console.log("BODY:", req.body);
    console.log("USER:", req.user);

    const app = await Application.create({
      ...req.body,
      user: req.user.id,
      timeline: [
        {
          status: req.body.status || "Applied"
        }
      ]
    });

    console.log("SAVED:", app);

    res.json(app);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message
    });
  }
};

exports.getApplications = async (req, res) => {

  const apps = await Application.find({
    user: req.user.id
  });

  res.json(apps);
};

exports.updateStatus = async (req, res) => {

  try {

    const app = await Application.findById(
      req.params.id
    );

    if (!app) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    app.status = req.body.status;

    app.timeline.push({
      status: req.body.status
    });

    await app.save();

    res.json(app);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });
  }
};

exports.exportCSV = async (req, res) => {

  const apps = await Application.find({
    user: req.user.id
  });

  exportCSV(apps, res);
};

exports.exportPDF = async (req, res) => {

  const apps = await Application.find({
    user: req.user.id
  });

  exportPDF(apps, res);
};