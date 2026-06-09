const PDFDocument = require("pdfkit");

module.exports = (apps, res) => {

  const doc = new PDFDocument();

  res.setHeader(
    "Content-Type",
    "application/pdf"
  );

  res.setHeader(
    "Content-Disposition",
    "attachment; filename=applications.pdf"
  );

  doc.pipe(res);

  doc.fontSize(20).text(
    "Job Applications Report",
    {
      align: "center"
    }
  );

  doc.moveDown();

  apps.forEach(app => {

    doc
      .fontSize(12)
      .text(
        `${app.company} | ${app.role} | ${app.status}`
      );

    doc.moveDown();
  });

  doc.end();
};