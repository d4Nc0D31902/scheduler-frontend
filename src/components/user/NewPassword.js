import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { Typography, Grid, Paper, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";

import { resetPassword, clearErrors } from "../../actions/userActions";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { error, success } = useSelector((state) => state.forgotPassword);
  let { token } = useParams();

  useEffect(() => {
    if (error) {
      // alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      // alert.success('Password updated successfully')
      navigate("/login");
    }
  }, [dispatch, error, success, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("password", password);
    formData.set("confirmPassword", confirmPassword);
    dispatch(resetPassword(token, formData));
  };

  return (
    <Fragment>
      <MetaData title={"New Password Reset"} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">New Password</h1>

            <div className="form-group">
              <TextField
                id="password_field"
                label="Password"
                type="password"
                variant="outlined"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
            </div>

            <div className="form-group">
              <TextField
                id="confirm_password_field"
                label="Confirm Password"
                type="password"
                variant="outlined"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
              />
            </div>

            <Button
              id="new_password_button"
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="py-3"
            >
              Set Password
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewPassword;
