

export const counter = (state ,string) => (dispatch) =>{
    console.log("strimng--",string,state)
   
    if(string === "INCREMENT") {
        state = state + 1;
        console.log("state value",state)
        dispatch({type:'INCREMENT', payload: state})
    }
    else
        state = state - 1;
       dispatch({type:'DECREMENT', payload: state})
     }
   