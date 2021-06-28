const V = require("voca");
const AppComponentGenerator = (entities) => {



  return `
  import React from "react";
  import logo from "./logo.svg";
  import "./App.css";
  import { Container, Row } from "react-bootstrap";
  import MenuBar from "./Components/Shared/MenuBar";
  import "bootstrap/dist/css/bootstrap.min.css";
  import "font-awesome/css/font-awesome.css";

  import { Provider } from "react-redux";
  import { store } from "./State/Store";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
  
  // Components 
  ${getLoadingLibraries(entities)}
  function App() {
    return (
      <Router>
      <Provider store={store}>
      <MenuBar></MenuBar>
        <Container  fluid>
         
          <Row className="py-4 justify-content-center">
          <Switch>
            ${getRouteComponentsForEntities(entities)}
          <Route path="/">
            <p>Welcome this is home page</p>
          </Route>
        </Switch>
          </Row>
        </Container>
      </Provider>
      </Router>
    );
  }
  
  export default App;
  `;
};
const getRouteComponentsForEntities = (entities) => {
  return entities
    .map((entity) => {
      const etitleCase = V.titleCase(entity.name);
      const eLowerCase = V.lowerCase(entity.name);
      if (!entity.authEntity)
        return `<Route path="/${eLowerCase}">
                    <${etitleCase}s />
                </Route>`;

      return `
                <SecuredRoutes path="/${eLowerCase}"
                component={${etitleCase}s}
                ></SecuredRoutes>
                `;
    })
    .join("");
};
const getLoadingLibraries = (entities) => {
  const loadSecuredRoutes = entities.some(entity=>entity.authEntity);
  const commponentImportsTemplate=  entities
    .map((entity) => {
      const etitleCase = V.titleCase(entity.name);
      const eLowerCase = V.lowerCase(entity.name);

      return `
        import ${etitleCase}s from "./Components/${eLowerCase}/${eLowerCase}List.component";
    
    `;
    });

    if(loadSecuredRoutes)
    commponentImportsTemplate.push(
      `
  import SecuredRoutes from "./Components/Shared/SecuredRoutes";
      `
    )

    return commponentImportsTemplate.join("")
};

module.exports = { AppComponentGenerator };
