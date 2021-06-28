const fs = require("fs");
const path = require("path");

const { ProcessState } = require("smart-react-state-store-library");

function ProcessStateFiles(entity, dir) {
  const stateData = ProcessState(entity);

  stateData.forEach(({ statePath, data }) => {
    try {
      fs.writeFileSync(path.join(dir, statePath), data);
    } catch (error) {
      console.log(error);
    }
  });
}
module.exports = { ProcessStateFiles };
