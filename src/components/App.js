import React from "react"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom"
import StudiesContextProvider from "../mocks/StudiesContextProvider"
import StudiesList from "./StudiesList"
import StudyView from "./StudyView"

function App() {
    return (
        <StudiesContextProvider>
            <Router>
                <Switch>
                    <Route exact path="/studies">
                        <StudiesList />
                    </Route>
                    <Route exact path="/studies/:studyId">
                        <StudyView />
                    </Route>
                    <Route path="/">
                        <Redirect from="/" to="/studies" />
                    </Route>
                </Switch>
            </Router>
        </StudiesContextProvider>
    )
}

export default App
