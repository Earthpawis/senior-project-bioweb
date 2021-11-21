
import './App.css';
import Dashboard from './screens/Dashboard';
import Importfile from './screens/Importfile';
import Login from './screens/Login'
import MIE from './screens/MIE';
import SideBar from './screens/SideBar';
import Report from './screens/Report';
import Bor from './screens/Bor';
import DataST from './screens/DataST';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  Redirect
} from "react-router-dom";
import ReactDOM from "react-dom";

function App() {

  const i = JSON.parse(localStorage.getItem('user'));
  console.log(i)
  if (!i) {
    return (
      <div>
        <Redirect to="/login" />
        <Route exact path="/login" component={Login} />
      </div>
      // { localStorage.getItem("user") ? <Redirect to = "/admin" /> : <Redirect to = "/login"/> }
    );
  } else {
    return (
      <div>
        <Redirect to="/Dashboard" />
        <div className="row">
          <div className="col-3">
            <SideBar />
          </div>
          <div className="col-9">
            <Switch>
              <Route exact path="/Dashboard" component={Dashboard} />
              <Route exact path="/MIE" component={MIE} />
              <Route exact path="/Importfile" component={Importfile} />
              <Route exact path="/Report" component={Report} />
              <Route exact path="/Bor" component={Bor} />
              <Route exact path="/DataST" component={DataST} />
            </Switch>
          </div>
        </div>



      </div>
    );
  }

  return (
    <div className="App">
      <div className="row">
        <div className="col-3">
          <SideBar />
        </div>
        <div className="col-12">
          <Login />
        </div>
      </div>
    </div>


  );


}

export default App;

