import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Links from "./components/Links";
import NavLinks from "./components/NavLinks";
import Login from "./pages/Login";

import styles from "./App.module.css";
console.log(styles);

const isLogin = true;

function App() {
  return (
    <BrowserRouter>
      <Links />
      <NavLinks />
      <Switch>
        <Route
          path="/Login"
          render={() => (isLogin ? <Redirect to="/" /> : <Login />)}
        />
        <Route path="/Profile/:id" component={Profile} />
        <Route path="/Profile" component={Profile} />
        <Route path="/About" component={About} />
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;