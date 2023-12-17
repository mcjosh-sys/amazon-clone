import { createContext, useReducer, useContext } from "react";
import { PropTypes } from "prop-types";

const StateContext = createContext()

export const StateProvider = ({reducer, initialState, children}) => (
    <StateContext.Provider value = {useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
)

StateProvider.propTypes = {
    reducer: PropTypes.any.isRequired,
    initialState: PropTypes.any.isRequired,
    children: PropTypes.any

  }

export const useStateValue = () => useContext(StateContext)