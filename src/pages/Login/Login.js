import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import './Login.css';

const Login = (props) => {

    const [username, setUsername] = useState("mimoh@gmail.com");
    const [password, setPassword] = useState("pass");
    const [errors, setErrors] = useState({username:null,password:null});
    // const navigate = useNavigate();
    
    // useEffect(() => {
    //     if(auth) navigate("../dashboard", { replace: true });
    // },[auth, navigate]);

    const onChangeInputHadler = (event,type) =>{
        const value = event.target.value;
        if(type){
            switch (type) {
                case 1:
                    setUsername(value);
                    break;
                case 2:
                    setPassword(value);
                    break;
                default:
                    break;
            }
        }
    }

    const onLoginClick = async () =>{
        if((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(username)) && password && password.length > 3){
            await props.loginUser(username,password);
        }
        else{
            const errors = {username:null,password:null};
            if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(username))) errors.username = "Invalid Email";
            if(!password || password.length <= 3) errors.username = "Invalid Password";
            setErrors(errors);
        }
    }

    return(
        <div className="container-fluid">
            <nav className="navbar navbar-light bg-light static-top">
                <div className="container">
                    <Link className="navbar-brand" to="/">Expense Tracker</Link>
                    <Link className="btn btn-primary" to="/login">Login</Link>
                </div>
            </nav>
            <main className="main-content login m-0" style={{marginLeft:'0'}}>
                <div className="page-header align-items-start min-vh-100" style={{backgroundImage:'url(images/bg-login.jpeg)'}}>
                <span className="mask bg-gradient-dark opacity-6"></span>
                <div className="container my-auto">
                    <div className="row">
                    <div className="col-lg-4 col-md-8 col-12 mx-auto my-auto">
                        <div className="card z-index-0 fadeIn3 fadeInBottom">
                        <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                            <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                                <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">Sign In</h4>
                            </div>
                        </div>
                        <div className="card-body">
                        {/* <form class="text-start"> */}
                            <div className="input-group-outline my-3">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" className="form-control" value={username} onChange={(event) => onChangeInputHadler(event,1)}/>
                                {errors.username ? <p className="input-error">{errors.username}</p> : null}
                            </div>
                            <div className="input-group-outline mb-3">
                                <label>Password</label>
                                <input type="password" className="form-control" value={password} onChange={(event) => onChangeInputHadler(event,2)} autoComplete="off"/>
                                {errors.password ? <p className="input-error">{errors.password}</p> : null}
                            </div>
                            <div className="form-check form-switch d-flex align-items-center mb-3">
                                <input className="form-check-input" type="checkbox" id="rememberMe"/>
                                <label className="form-check-label mb-0 ms-2" htmlFor="rememberMe">Remember me</label>
                            </div>
                            <div className="text-center">
                                <button type="button" className="btn bg-gradient-primary w-100 my-4 mb-2" onClick={() => onLoginClick()}>Sign in</button>
                            </div>
                            <p className="mt-4 text-sm text-center">
                                Don't have an account?&nbsp;
                                <Link to="/signup" className="text-primary text-gradient font-weight-bold">Sign up</Link>
                            </p>
                            {/* </form> */}
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <footer className="footer position-absolute bottom-2 py-2 w-100 mb-2">
                    <div className="container">
                    <div className="row align-items-center justify-content-lg-between">
                        <div className="col-12 col-md-6 text-right">
                            <div className="copyright text-center text-sm text-white text-lg-start">
                                © {new Date().getFullYear()},
                                made with <i className="fa fa-heart" aria-hidden="true"></i>&nbsp;by &nbsp;
                                <a href="https://www.linkedin.com/in/mimoh-kulkarni/" className="font-weight-bold text-white" target="_blank" rel="noreferrer">Mimoh Kulkarni</a>
                            </div>
                        </div>
                    </div>
                    </div>
                </footer>
                </div>
            </main>
        </div>
    );

}
const mapStatetoProps = state => {
    return {
        loginRes : state.login.loginRes,
        registerRes : state.login.registerRes
    };
}
const mapDispatchToProps = dispatch =>{
    return{
        // loginUser : (username,password) => dispatch(loginActions.loginUser(username,password))
    }
}
export default connect(mapStatetoProps,mapDispatchToProps)(Login);