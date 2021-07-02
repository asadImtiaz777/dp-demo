import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Login from '../Login/Login';
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';
import Dashboard from '../Dashboard/Dashboard';
import RecordTime from '../RecordTime/RecordTime';

function App(){
    const customHistory = createBrowserHistory();
    return(
        <>
            <Router history={customHistory}>
                <Switch>
                    <Route path="/login" component={Login} />
                    <PrivateRoute path="/record-time" component={RecordTime} />
                    <PrivateRoute path="/" component={Dashboard} />
                </Switch>
            </Router>
        </>
    )
}

export default App;
