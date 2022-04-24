import { useEffect, useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Layout = (props) => {

    const [sideNavShow, setSideNavShow] = useState(false);
    const [active, setActive] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setActive(location.pathname.replace("/",''));
        return () => {
            setActive("");
        }
    }, [location])


    useLayoutEffect(() => {
        const updateSize = () =>{
            setSideNavShow(window.innerWidth >= 1200);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    const onLogout = () => {
        localStorage.clear();
        navigate("../", { replace: true });
    }
    
    return (
        <div className="container-fluid">
            <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 bg-gradient-dark" style={{zIndex:'1021',visibility:sideNavShow ? 'visible' : 'hidden'}}>
                <div className="sidenav-header">
                    <i className={window.innerWidth <= 1200 ? "fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0" : 
                    "fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none"} aria-hidden="true" id="iconSidenav" 
                    onClick={() => setSideNavShow(false)}></i>
                    <Link className="navbar-brand m-0" to="/dashboard">
                        <span className="ms-1 font-weight-bold text-white">Expense Tracker</span>
                    </Link>
                </div>
                <hr className="horizontal light mt-0 mb-2"/>
                <div className="collapse navbar-collapse  w-auto  max-height-vh-100" id="sidenav-collapse-main">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/dashboard" className={"nav-link text-white" + (active === "dashboard" ? ' active bg-gradient-primary' : '')}>
                                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="fas fa-home"></i>
                                </div>
                                <span className="nav-link-text ms-1">Dashboard</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                        <Link to="/transactions" className={"nav-link text-white" + (active === "transactions" ? ' active bg-gradient-primary' : '')}>
                            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                            <i className="fas fa-rupee-sign"></i>
                            </div>
                            <span className="nav-link-text ms-1">Transactions</span>
                        </Link>
                        </li>
                        <li className="nav-item">
                        <Link to="/graphs" className={"nav-link text-white" + (active === "graphs" ? ' active bg-gradient-primary' : '')}>
                            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                            <i className="fas fa-chart-pie"></i>
                            </div>
                            <span className="nav-link-text ms-1">Graphs</span>
                        </Link>
                        </li>
                        <li className="nav-item">
                        <Link to="/aibudget" className={"nav-link text-white" + (active === "aibudget" ? ' active bg-gradient-primary' : '')}>
                            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                            <i className="fas fa-laptop-code"></i>
                            </div>
                            <span className="nav-link-text ms-1">AI Budget Tracking</span>
                        </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/profile" className={"nav-link text-white" + (active === "profile" ? ' active bg-gradient-primary' : '')}>
                                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="fas fa-user"></i>
                                </div>
                                <span className="nav-link-text ms-1">Profile</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link text-white"  role="button" onClick={onLogout}>
                            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                            <i className="fas fa-sign-out-alt"></i>
                            </div>
                            <span className="nav-link-text ms-1">Logout</span>
                        </a>
                        </li>
                    </ul>
                </div>
            </aside>
            <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl position-sticky blur shadow-blur mt-4 left-auto top-1 z-index-sticky" id="navbarBlur" navbar-scroll="true">
                    <div className="container-fluid py-1 px-3 bg-dark text-white">
                        <nav aria-label="breadcrumb">
                        <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                            <li className="breadcrumb-item text-sm">User</li>
                            <li className="breadcrumb-item text-sm active" aria-current="page">{active.charAt(0).toUpperCase() + active.slice(1)}</li>
                        </ol>
                        <h6 className="font-weight-bolder mb-0 text-white">{active.charAt(0).toUpperCase() + active.slice(1)}</h6>
                        </nav>
                        <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4 justify-content-end" id="navbar">
                            <ul className="navbar-nav ">
                                <li className="nav-item d-flex align-items-center">
                                    <Link to="/user" className="nav-link text-white font-weight-bold px-0">
                                        <i className="fa fa-user me-sm-1"></i>&nbsp;
                                        <span className="d-sm-inline d-none">User</span>
                                    </Link>
                                </li>
                                <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
                                    <span className="nav-link text-white p-0">
                                        <div className="sidenav-toggler-inner" onClick={() => setSideNavShow(!sideNavShow)}>
                                        <i className="sidenav-toggler-line"></i>
                                        <i className="sidenav-toggler-line"></i>
                                        <i className="sidenav-toggler-line"></i>
                                        </div>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            {props.children}
        </div>
    );
}

export default Layout;