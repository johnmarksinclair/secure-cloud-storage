import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dash from "./views/Dash";
import Login from "./views/Login";
import Register from "./views/Register";
import "./App.css";

function App() {
  return (
    <div className="vh">
      <Router>
        <Switch>
          <Route path="/" exact component={Dash} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
