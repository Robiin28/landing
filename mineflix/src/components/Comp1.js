

import React,{ useReducer } from "react";

const Comp1=()=>{

    const reducer = (state, action) => {
        switch (action.type) {
          case "INCREMENT":
            return { count: state.count + 1 };
          case "DECREMENT":
            return { count: state.count - 1 };
          default:
            return state;
        }
      };
    let [state, dispatch] = useReducer(reducer, { count: 0 });

return(
<>
 <div>
        <h2>Count: {state.count}</h2>
        <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
        <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
      </div>


</>
)
}
export default Comp1;