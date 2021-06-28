const { GenerateAssets } = require("./ProcessReactWeb/GenerateAssets");
const {
  AppComponentGenerator
} = require("./CommonUtilityGenerator/Components/App/AppComponentGenerator");
const {
  CreateSecuredRouteComponent
} = require("./CommonUtilityGenerator/Components/App/createSecuredRoute");
const {
  NavBarComponentContent
} = require("./CommonUtilityGenerator/Components/Shared//Navbar/NavBarComponentContent");
const fs = require("fs");
const path = require("path");
const { StoreCreator } = require("./CommonUtilityGenerator/State/StoreCreator");
const { SagaCreator } = require("./CommonUtilityGenerator/State/SagaCreator");
const {
  LoadingComponentGenerator,ErrorComponentGenerator
} = require("./CommonUtilityGenerator/Components/App/loadingComponentgenerator");

async function createWebReactResourses(entityList, processFiles, dirName,
  isServerLess = false,
  serverLessType = null) {
  //Generate Common Things
  ProcessAppComponent(
    dirName,
    entityList
  );

 const isAnySecuredEntity = entityList.some(entity=>entity.authEntity);
  if(isAnySecuredEntity){
    ProcessSecuredRoutesComponent(dirName)
  }

  ProcessLoadingComponent(entityList,dirName);
  ProcesserrorComponent(entityList,dirName);

  ProcessNavBarComponent(entityList, dirName);

  //Create the store
  ProcessStore(entityList, dirName);


  //create the saga
  ProcessSaga(entityList, dirName);


  return await GenerateAssets(entityList, processFiles, dirName,isServerLess,serverLessType);
}

const ProcessAppComponent = (dir, eNames) => {
  const appComponentDatta = AppComponentGenerator(eNames);
  componentPath = `App.js`;
  try {
    fs.writeFileSync(path.join(dir, componentPath), appComponentDatta);
  } catch (error) {
    console.log(error);
  }
};

const ProcessLoadingComponent = (entityList, dir) => {
  const appComponentDatta = LoadingComponentGenerator();
  componentPath = `Components/Shared/LoadingComponent.js`;
  createfileWithdata(dir,componentPath, appComponentDatta);
};
const ProcesserrorComponent = (entityList, dir) => {
  const appComponentDatta = ErrorComponentGenerator();
  componentPath = `Components/Shared/ErrorComponent.js`;
  createfileWithdata(dir,componentPath, appComponentDatta);
};
const ProcessNavBarComponent = (entityList, dir) => {
  const appComponentDatta = NavBarComponentContent(entityList);
  componentPath = `Components/Shared/MenuBar.js`;
  createfileWithdata(dir,componentPath, appComponentDatta);

};
const ProcessSecuredRoutesComponent = (dir) => {
  const appComponentDatta = CreateSecuredRouteComponent();
  componentPath = `Components/Shared/SecuredRoutes.js`;
  createfileWithdata(dir,componentPath, appComponentDatta);

};
const ProcessStore = (entityList, dir) => {
  const appComponentDatta = StoreCreator(entityList);
  componentPath = `State/Store.js`;
  createfileWithdata(dir,componentPath, appComponentDatta);

};
const ProcessSaga = (entityList, dir) => {
  const appComponentDatta = SagaCreator(entityList);
  componentPath = `State/Sagas/index.js`;
  createfileWithdata(dir,componentPath, appComponentDatta);

};
module.exports = { createWebReactResourses };
function createfileWithdata(dir,componentPath, appComponentDatta) {
  try {
    fs.writeFileSync(path.join(dir, componentPath), appComponentDatta);
  }
  catch (error) {
    console.log(error);
  }
}

