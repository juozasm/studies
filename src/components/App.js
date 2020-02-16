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
import StatusPage from "./StatusPage"

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
                    <Route exact path="/">
                        <Redirect from="/" to="/studies" />
                    </Route>
                    <Route path="/error/:status">
                        <StatusPage />
                    </Route>
                    <Route path="*">
                        <Redirect from="*" to="/error/:404" />
                    </Route>
                </Switch>
            </Router>
        </StudiesContextProvider>
    )
}

export default App
