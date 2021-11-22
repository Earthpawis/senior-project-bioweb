
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
  let Test = "";
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
      <div className="container-fluid">
        <div className="row">
          <Redirect to="/Dashboard" />
          {/* <div className="row"> */}
          <div className="col-xl-3 col-lg-3 col-sm-3 col-mb-3 col-3" >
            <SideBar />
          </div>
          <div className="col-xl-9 col-lg-9 col-sm-9 col-mb-9 col-9">
            <Switch>
              <Route exact path="/Dashboard" component={Dashboard} />
              <Route exact path="/MIE" component={MIE} />
              <Route exact path="/Importfile" component={Importfile} />
              <Route exact path="/Report" component={Report} />
              <Route exact path="/Bor" component={Bor} />
              <Route exact path="/DataST" component={DataST} />
            </Switch>
          </div>
          {/*  </div> */}


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

