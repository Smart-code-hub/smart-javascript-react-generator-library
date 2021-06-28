const fs = require("fs");
const path = require("path");
const V = require("voca");
const { ProcessService } = require("smart-react-service-store-library");

function ProcessServiceFiles(
  entity,
  dir,

  isServerLess = false,
  serverLessType = null
) {
  let serviceData =[];
  if(isServerLess == false)
   serviceData = ProcessService(entity);
  else{
   serviceData = ProcessService(entity,
    serverLessType);

  }
  if (
    !fs.existsSync(dir + `/Services/${V.titleCase(entity.name.toLowerCase())}`)
  ) {
    fs.mkdirSync(dir + `/Services/${V.titleCase(entity.name.toLowerCase())}`, {
      recursive: true,
    });
  }

  serviceData.forEach(({ servicePath, data }) => {
    try {
      fs.writeFileSync(path.join(dir, servicePath), data);
    } catch (error) {
      console.log(error);
    }
  });
}
module.exports = { ProcessServiceFiles };
