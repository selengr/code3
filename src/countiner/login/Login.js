import React from 'react';
import "../../assets/css/login.css"

const Login = () => {
    return (
        
    <div classNam="container body">
    <div classNam="row">
        <div classNam="col-lg-3 col-md-2"></div>
        <div classNam="col-lg-6 col-md-8 login-box">
            <div classNam="col-lg-12 login-key">
                <i classNam="fa fa-key" aria-hidden="true"></i>
            </div>
            <div classNam="col-lg-12 login-title">
                ADMIN PANEL
            </div>

            <div classNam="col-lg-12 login-form">
                <div classNam="col-lg-12 login-form">
                    <form>
                        <div classNam="form-group">
                            <label classNam="form-control-label">USERNAME</label>
                            <input type="text" classNam="form-control" />
                        </div>
                        <div classNam="form-group">
                            <label classNam="form-control-label">PASSWORD</label>
                            <input type="password" classNam="form-control" i />
                        </div>

                        <div classNam="col-lg-12 loginbttm">
                            <div classNam="col-lg-6 login-btm login-text">
                            </div>
                            <div classNam="col-lg-6 login-btm login-button">
                                <button type="submit" classNam="btn btn-outline-primary">LOGIN</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div classNam="col-lg-3 col-md-2"></div>
        </div>
    </div>
    </div>

    );
}

export default Login;
