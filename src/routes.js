import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login/Login';

const MyRoutes = (props) => {

    // const PrivateRoute = ({component : Component, ...rest }) => (
    //    isUserAuthenticated() ? <Outlet/> : <Navigate to="/login"/>
    // )

    return(
        <Routes>
            <Route path="/" element={<Home/>} caseSensitive/>
            <Route path="/login" element={<Login/>} />
            {/* <PrivateRoute path="/addTransaction" component={Add}/> */}
        </Routes>
    );
}
export default MyRoutes;