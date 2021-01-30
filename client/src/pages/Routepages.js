import NavBar from '../components/NavBar';
import { Switch, Route } from 'react-router-dom';
import AboutPage from './AboutPage';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import NewUserPage from './NewUserPage';


//Component to handle the pathing to the correct components (includes components that have standard navbar components which is different for the dashboard)
export default function Routepages() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path='/about'>
                    <AboutPage />
                </Route>
                <Route path='/signup'>
                    <SignupPage />
                </Route>
                <Route path='/login'>
                    <LoginPage />
                </Route>
                <Route path='/newuser'>
                    <NewUserPage />
                </Route>
            </Switch>
        </>
    );
};