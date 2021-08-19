import AcccessibleTable from "./components/table";
import EmbededTable from "./components/subprocessor-embed";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={AcccessibleTable} />
          <Route exact path="/embeded" component={EmbededTable} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
