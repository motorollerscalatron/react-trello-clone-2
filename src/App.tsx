import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Board from "./views/Board/Board";
import BoardContextProvider from "./context/BoardContext";

function App() {
  return (
    <div className="App">
      <BoardContextProvider>
        <Router>
          <Switch>
            <Route path="/" component={Board} />
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </Router>
      </BoardContextProvider>
    </div>
  );
}

export default App;
