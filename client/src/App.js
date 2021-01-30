//Package Imports
import { Route, Switch } from 'react-router-dom';

//Component Imports
import Homepage from './pages/Homepage';
import Routepages from './pages/Routepages';
import Dashboard from './pages/Dashboard';
import LogoutPage from './pages/LogoutPage';
import ErrorPage from './pages/ErrorPage';


export default function App() {
  return (
    <main className="App">
      <Switch>
        <Route exact path='/'>
          <Homepage />
        </Route>
        <Route path={['/about', '/signup', '/login', '/newuser']}>
          <Routepages />
        </Route>
        <Route path='/dashboard'>
          <Dashboard />
        </Route>
        <Route path='/logout'>
          <LogoutPage />
        </Route>
        <Route path="/*">
          <ErrorPage />
        </Route>
      </Switch>
    </main>
  );
}

