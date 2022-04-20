import React, { useContext, createContext } from 'react';

export function useCreateContext(
  reducer,
  initialState
) {
  const defaultDispatch = () => initialState;
  const stateCtx = createContext(initialState);
  const dispatchCtx = createContext(defaultDispatch);

  function useStateCtx(property) {
    const state = useContext(stateCtx);
    return state[property]; // only one depth selector for comparison
  }

  function useDispatchCtx() {
    return useContext(dispatchCtx);
  }
 
  function Provider(props) {
    const [state, dispatch] = React.useReducer
    (reducer, initialState);
    return (
      <dispatchCtx.Provider value={dispatch}>
        <stateCtx.Provider value={state}>{props.children}</stateCtx.Provider>
      </dispatchCtx.Provider>
    );
  }
  return [useStateCtx, useDispatchCtx, Provider];
}
