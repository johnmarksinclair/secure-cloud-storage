import { BrowserRouter as Router, Route } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./providers/UserProvider";
import Dash from "./views/Dash";
import Login from "./views/Login";
import "./App.css";

function App() {
  const user = useContext(UserContext);
  return (
    <div className="vh">
      <Router>
        {user ? (
          <Route path="/" exact component={Dash} />
        ) : (
          <Route path="/" exact component={Login} />
        )}
      </Router>
    </div>
  );
}

export default App;
