import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS file
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../actions/userActions";
import "../../App.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let location = useLocation();
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );
  const redirect = new URLSearchParams(location.search).get("redirect");

  useEffect(() => {
    if (isAuthenticated && redirect === "shipping") {
      navigate(`/${redirect}`, { replace: true });
    } else if (isAuthenticated) {
      navigate("/");
      toast.success("Login successful!");
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error, navigate, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Login"} />

          <div className="row wrapper" style={{ display: "", margin: "40px", boxShadow: "5px 1px 8px maroon" }}>

            <div style={{ display: "flex" }}>
              <div className=" logoto col-md-1 col-lg-4 col-sm-1" style={{ backgroundColor: "maroon", padding: "125px 0px", width: "400px" }}>
                <img
                  src="/images/tupt_logo.png"
                  style={{ width: "80%", height: "100%", marginLeft: "42px" }}
                  alt="Logo"
                />
              </div>
              <div className=" loginto col-md-11 col-lg-12 col-sm-11" style={{ backgroundColor: "white", padding: "0px 0px", width: "400px", flex: "1" }}>
                <div className="col-12 col-lg-12">
                  <form onSubmit={submitHandler}>
                    <h3 className="text-center" style={{ marginBottom: "60px" }}>Log in</h3>
                    <div className="form-group">
                      <label htmlFor="email_field">Email</label>
                      <input
                        type="email"
                        id="email_field"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john.doe@tup.edu.ph"
                        style={{ marginBottom: "30px", borderStyle: "solid" }}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="password_field">Password</label>
                      <input
                        type="password"
                        id="password_field"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Your Password"
                      />
                    </div>

                    <Link to="/password/forgot" className="float-right mb-4">
                      Forgot Password?
                    </Link>

                    <button
                      id="login_button"
                      type="submit"
                      className="btn btn-block py-3"
                    >
                      LOGIN
                    </button>

                    <Link to="/register" className="float-right mt-3">
                      New User?
                    </Link>
                  </form>
                </div>
              </div>

            </div>
            {/* <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 >Login</h1>
                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password_field">Password</label>
                  <input
                    type="password"
                    id="password_field"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <Link to="/password/forgot" className="float-right mb-4">
                  Forgot Password?
                </Link>

                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                >
                  LOGIN
                </button>

                <Link to="/register" className="float-right mt-3">
                  New User?
                </Link>
              </form> */}
            {/* </div> */}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
