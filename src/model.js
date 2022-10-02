const fs = require("fs");
const path = require("path");
const { dirname } = require("path");
const appDir = dirname(require.main.filename);
module.exports = (data, dir = false) => {
  dir = dir || appDir;
  console.log({ data, dir });
  try {
    fs.writeFileSync(
      path.join(dir, "spectator.json"),
      JSON.stringify(data),
      "utf-8"
    );
  } catch (err) {
    console.error(err);
  }
};
