import {createContext, useState} from "react";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
    const [state, setState] = useState({
        selectedCategoryId:'0',
        searchValue:'',
        user:''

    });
    const updateState = (state) => {
        setState(state);
    }

    return (
        <MyContext.Provider value={[state, setState]}>
            {children}
        </MyContext.Provider>
    )
}