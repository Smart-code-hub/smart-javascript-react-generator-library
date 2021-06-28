const { ProcessEntity } = require("./ProcessEntity");

async function GenerateAssets(entities, processFiles, dir,
  isServerLess = false,
  serverLessType = null) {
  if (entities) {
    console.log(entities.map(a => a.entitySchema));

    for (const entity of entities) {
      if (processFiles) ProcessEntity(entity, dir,
        isServerLess ,
        serverLessType );
    }
  }
  if (processFiles) {
    return {
      entities
    };
  }
  return {
    entities
  };
}
module.exports = { GenerateAssets };
