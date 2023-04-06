export const test ( props)=>{
    const { component , validate } = props;
    if(validate == true ){
        return component
    }
}


test(component,true);