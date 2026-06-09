const { Parser } = require("json2csv");

module.exports = (data, res) => {

  const fields = [
    "company",
    "role",
    "status",
    "appliedDate"
  ];

  const parser = new Parser({ fields });

  const csv = parser.parse(data);

  res.header("Content-Type", "text/csv");

  res.attachment("applications.csv");

  return res.send(csv);
};