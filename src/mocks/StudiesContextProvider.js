import React from "react"
import studiesDetails from "./details.json"
import studiesList from "./list.json"

export const StudiesContext = React.createContext({})

const data = {
    studiesDetails,
    studiesList
}
export default function StudiesContextProvider({ children }) {
    return (
        <StudiesContext.Provider value={data}>
            {children}
        </StudiesContext.Provider>
    )
}
