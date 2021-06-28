const fs = require("fs");
const path = require("path");

const { ProcessComponents } = require("smart-react-component-library");

function ProcessComponentFiles(entity, dir,serverLessType = null) {
  const componentData = ProcessComponents(entity,serverLessType);
  if (!fs.existsSync(dir + `/Components/${entity.name.toLowerCase()}`)) {
    fs.mkdirSync(dir + `/Components/${entity.name.toLowerCase()}`, {
      recursive: true
    });
  }

  componentData.forEach(({ componentPath, data }) => {
    try {
      fs.writeFileSync(path.join(dir, componentPath), data);
    } catch (error) {
      console.log(error);
    }
  });
}
module.exports = { ProcessComponentFiles };
