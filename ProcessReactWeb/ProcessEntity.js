const { ProcessComponentFiles } = require("./ProcessComponentFiles");
const { ProcessStateFiles } = require("./ProcessStateFiles");
const { ProcessServiceFiles } = require("./ProcessServiceFiles");

function ProcessEntity(entity, dir, isServerLess = false,
  serverLessType = null) {
  ProcessComponentFiles(entity, dir,serverLessType);
  ProcessStateFiles(entity, dir);
  ProcessServiceFiles(entity, dir,
    isServerLess ,
    serverLessType );

  //   fs.writeFileSync(
  //     path.join(dir, `${entity.name.toLowerCase()}.instruction.txt`),
  //     helpData
  //   );
}

module.exports = { ProcessEntity };
