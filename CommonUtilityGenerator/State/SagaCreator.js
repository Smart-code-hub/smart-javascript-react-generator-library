const V = require("voca");

const SagaCreator = entities => {
    return `
    import { takeEvery, takeLatest } from "redux-saga/effects";
    ${FetchAllActionTypesImport(entities)} 
    ${FetchAllSagasImport(entities)}
    export function* watchAuth() {
    ${FetchFunctionData(entities)}
    }
    `;
};

const FetchFunctionData = (entities)=>{
    return entities
    .map(entity => {
        const EntityNameUpperCase = V.upperCase(entity.name);
        const EntityNameCamelCase = V.camelCase(entity.name);
        const EntityNameTitleCase = V.titleCase(entity.name);
        return `
        yield takeEvery(${EntityNameUpperCase}_FETCH, Fetch${EntityNameTitleCase});
        yield takeEvery(${EntityNameUpperCase}_UPDATE, Update${EntityNameTitleCase});
        yield takeEvery(${EntityNameUpperCase}_ADD, Add${EntityNameTitleCase});
        yield takeEvery(${EntityNameUpperCase}_REMOVE, Remove${EntityNameTitleCase});`
    }).join(' ')
}
const FetchAllActionTypesImport = (entities)=>{
    return entities
    .map(entity => {
        const EntityNameUpperCase = V.upperCase(entity.name);
        const EntityNameCamelCase = V.camelCase(entity.name);
        const EntityNameTitleCase = V.titleCase(entity.name);
        return `
        import {
            ${EntityNameUpperCase}_FETCH,
            ${EntityNameUpperCase}_ADD,
            ${EntityNameUpperCase}_UPDATE,
            ${EntityNameUpperCase}_REMOVE
          } from "../Actions/${EntityNameCamelCase}Actions";
        `
    }).join('');
}


const FetchAllSagasImport = (entities)=>{
    return entities
    .map(entity => {
        const EntityNameUpperCase = V.upperCase(entity.name);
        const EntityNameCamelCase = V.camelCase(entity.name);
        const EntityNameTitleCase = V.titleCase(entity.name);
        return `
        import {
            Fetch${EntityNameTitleCase},
            Update${EntityNameTitleCase},
            Add${EntityNameTitleCase},
            Remove${EntityNameTitleCase}
          } from "./${EntityNameCamelCase}Saga";
        `
    }).join('');
}
module.exports = { SagaCreator };
