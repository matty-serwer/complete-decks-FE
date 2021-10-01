import { createContext } from 'react';

export interface IUIActions {
  type: 'ADD_STRIKE_CLASS' | 'REMOVE_STRIKE_CLASS';
  payload: string;
}

export interface IUIState {
  deckStrikeClass: string;
  trucksStrikeClass: string;
  wheelsStrikeClass: string;
}

export const initialUIState: IUIState = {
  deckStrikeClass: "",
  trucksStrikeClass: "",
  wheelsStrikeClass: ""
}

export const uiReducer = (state: IUIState, action: IUIActions) => {
  let deckStrikeClass = state.deckStrikeClass;
  let trucksStrikeClass = state.trucksStrikeClass;
  let wheelsStrikeClass = state.wheelsStrikeClass;

  switch (action.type) {

    case 'ADD_STRIKE_CLASS':

      if (action.payload === 'decks') {
        console.log('decks in reducer')
        return { ...state, deckStrikeClass: "strike-thru" }
      }
      if (action.payload === 'trucks') {
        console.log('trucks in reducer')
        return { ...state, trucksStrikeClass: "strike-thru" }
      }
      if (action.payload === 'wheels') {
        console.log('wheels in reducer')
        return { ...state, wheelsStrikeClass: "strike-thru" }
      } else {
        console.log("incorrect payload");
        return state;
      }

    case 'REMOVE_STRIKE_CLASS':

      if (action.payload === 'decks') {
        console.log('decks in reducer')
        return { ...state, deckStrikeClass: "" }
      }
      if (action.payload === 'trucks') {
        console.log('trucks in reducer')
        return { ...state, trucksStrikeClass: "" }
      }
      if (action.payload === 'wheels') {
        console.log('wheels in reducer')
        return { ...state, wheelsStrikeClass: "" }
      } else {
        console.log("incorrect payload");
        return state;
      }
    default:
      return state;
  }
}

export interface IUIContextProps {
  uiState: IUIState;
  uiDispatch: React.Dispatch<IUIActions>;
}

const UIContext = createContext<IUIContextProps>({
  uiState: initialUIState,
  uiDispatch: () => { },
})

export const UIContextConsumer = UIContext.Consumer;
export const UIContextProvider = UIContext.Provider;
export default UIContext;