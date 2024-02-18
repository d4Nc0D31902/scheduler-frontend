import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { forgotPassword, clearErrors } from "../../actions/userActions";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { error, loading, message } = useSelector(
    (state) => state.forgotPassword
  );
  const success = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  const notify = (error = "") =>
    toast.error(error, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  useEffect(() => {
    if (error) {
      notify(error);
      dispatch(clearErrors());
    }
    if (message) {
      success(message);
    }
  }, [dispatch, error, message]);
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("email", email);
    dispatch(forgotPassword(formData));
  };
  return (
    <Fragment>
      <MetaData title={"Forgot Password"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <h3
            className="card-title"
            style={{
              fontFamily: "sans-serif",
              textAlign: "center",
              marginBottom: "10px",
              margin: "20px",
            }}
          >
            <img
              src="/images/tupt_logo.png"
              style={{ width: "100px", height: "100px", marginRight: "25px" }}
              alt="Logo"
            />
            TECHNOLOGICAL UNIVERSITY OF THE PHILIPPINES
          </h3>
          <form className="shadow-lg" onSubmit={submitHandler}>
            <p
              className="mb-4 text-center"
              style={{
                backgroundColor: "maroon",
                padding: "20px",
                borderRadius: "2px",
                color: "white",
              }}
            >
              In the password reset process, we simply send an email containing
              a verification code to your email address. Upon receiving the
              code, you can use it to set a new password for your account.
            </p>

            <div className="form-group">
              <label htmlFor="email_field">Enter Email</label>

              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="juan.delacruz@tup.edu.ph"
              />
            </div>

            <button
              id="forgot_password_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false}
            >
              Send Email
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
