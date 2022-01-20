import "./App.css";
import Dashboard from "./screens/Dashboard";
import Importfile from "./screens/Importfile";
import Login from "./screens/Login";
import MIE from "./screens/MIE";
import SideBar from "./screens/SideBar";
import Report from "./screens/Report";
import Bor from "./screens/Bor";
import DataST from "./screens/DataST";


import StBorrow from "./screens/FrontEnd/StBorrow";
import StDis from "./screens/FrontEnd/StDis";
import StNavbar from "./screens/FrontEnd/StNavbar";
import StChemicalList from "./screens/FrontEnd/StChemicalList";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  Redirect,
} from "react-router-dom";
import ReactDOM from "react-dom";

const _404Page = () => <div>404 not found</div>;
const adminRoute = () => (
  <Switch>
    <Route exact path="/Dashboard" component={Dashboard} />
    <Route exact path="/MIE" component={MIE} />
    <Route exact path="/Importfile" component={Importfile} />
    <Route exact path="/Report" component={Report} />
    <Route exact path="/Bor" component={Bor} />
    <Route exact path="/DataST" component={DataST} />
    <Route path="**" component={_404Page} />
  </Switch>
);

const studentRoute = () => (
  <Switch>
    <Route exact path="/StBorrow" component={StBorrow} />
    <Route exact path="/StDis" component={StDis} />
    <Route exact path="/StChemicalList" component={StChemicalList} />
    <Route path="*" exact component={_404Page} />
  </Switch>
);

const _mapRoute = () => {
  const i = JSON.parse(localStorage.getItem("user"));
  if (i?.std_id) {
    return (<div className="container-fluid">
      <StNavbar />
      {studentRoute()}
    </div>);
  } else if (i.admin_id) {
    return (
      <div className="container-fluid">
        <div className="row">
          {/* <Redirect to="/Dashboard" /> */}
          <div className="col-xl-3 col-lg-3 col-sm-3 col-mb-3 col-3">
            <SideBar />
          </div>
          <div className="col-xl-9 col-lg-9 col-sm-9 col-mb-9 col-9">
            {adminRoute()}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <Redirect to="/login" />
        <Route exact path="/login" component={Login} />
      </>
    );
  }
};

function App() {
  const i = JSON.parse(localStorage.getItem("user"));
  if (!i) {
    return (
      <div>
        <Redirect to="/login" />
        <Route exact path="/login" component={Login} />
      </div>
      // { localStorage.getItem("user") ? <Redirect to = "/admin" /> : <Redirect to = "/login"/> }
    );
  } else {
    return <>{_mapRoute()}</>;
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
