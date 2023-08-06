import React, { createContext, useReducer } from "react";

const initialState: IApplicationState = {
  clients: [],
};

export const StateContext = createContext<{
  state: IApplicationState;
  dispatch: React.Dispatch<Action>;
}>(
  // @ts-ignore
  null
);

export const ACTIONS = {
  FETCH_ALL_CLIENTS: "FETCH_ALL_CLIENTS",
  ATTEMPT_OPTIMISCTIC_CLIENT: "ATTEMPT_OPTIMISCTIC_CLIENT", // id is not synched with backend
  SEARCH_CLIENT: 'SEARCH_CLIENT',
  OPTIMISCTIC_DELETE_CLIENT: 'OPTIMISCTIC_DELETE_CLIENT',
};

type Action = {
  type: keyof typeof ACTIONS;
  data: any;
};

const reducer = (state: IApplicationState, action: Action) => {
  switch (action.type) {
    case ACTIONS.FETCH_ALL_CLIENTS:
      return { ...state, clients: action.data };
    case ACTIONS.ATTEMPT_OPTIMISCTIC_CLIENT:
      return {
        ...state,
        clients:
          state.clients.concat(action.data)
          .sort((a, b) => {
            if (a.firstName < b.firstName) {
              return -1;
            }
            if (a.firstName > b.firstName) {
              return 1;
            }
            return 0;
          })
      };
    case ACTIONS.SEARCH_CLIENT:
      return {
        ...state,
        clients: action.data,
      };
    case ACTIONS.OPTIMISCTIC_DELETE_CLIENT:
      return {
        ...state,
        clients: state.clients.filter((client) => client.id !== action.data && client),
      }
    default:
      return state;
  }
};

export default function DataProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}
