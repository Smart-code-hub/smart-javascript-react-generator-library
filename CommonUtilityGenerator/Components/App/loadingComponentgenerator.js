

const LoadingComponentGenerator = ()=>{
    return `
    import React from 'react'

export const LoadingComponent = () =>{
    return (
        <div class="sk-folding-cube ">
        <div class="sk-cube1 sk-cube"></div>
        <div class="sk-cube2 sk-cube"></div>
        <div class="sk-cube4 sk-cube"></div>
        <div class="sk-cube3 sk-cube"></div>
      </div>
    )
}
`;
}

const ErrorComponentGenerator = ()=>{
    return `
    import React from 'react'
    import Alert from 'react-bootstrap/Alert'
    export const ErrorComponent = ({message}) =>{
        return (
            <Alert  variant='danger'>
                 {message}
            </Alert>
        )
    }
`;
}
module.exports = { LoadingComponentGenerator ,ErrorComponentGenerator };
