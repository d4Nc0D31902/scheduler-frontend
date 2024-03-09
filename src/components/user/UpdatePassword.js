import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import MetaData from '../layout/MetaData'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Typography, Grid, Paper, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import { updatePassword, clearErrors } from '../../actions/userActions'

import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants'


const UpdatePassword = () => {
    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { error, isUpdated, loading } = useSelector(state => state.user)
    const success = (message='' ) => toast.success(message, {
        position: toast.POSITION.BOTTOM_CENTER
    });
    const notify = (error='' ) => toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER
    });
    useEffect(() => {
        if (error) {
            console.log(error)
            notify(error)
            dispatch(clearErrors());
        }
        if (isUpdated) {
            success('Password updated successfully')
            navigate('/me')
            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }
    }, [dispatch,  error, navigate, isUpdated])
    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('oldPassword', oldPassword);
        formData.set('password', password);
        dispatch(updatePassword(formData))
    }
    return (

        <Fragment>
            <MetaData title={'Change Password'} />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mt-2 mb-5">Update Password</h1>

                        <div className="form-group">
                            <TextField
                                id="old_password_field"
                                label="Old Password"
                                type="password"
                                variant="outlined"
                                className="form-control"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                fullWidth
                            />
                        </div>

                        <div className="form-group">
                            <TextField
                                id="new_password_field"
                                label="New Password"
                                type="password"
                                variant="outlined"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                fullWidth
                            />
                        </div>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            className="update-btn mt-4 mb-3"
                            disabled={loading ? true : false}
                        >
                            Update Password
                        </Button>
                    </form>
                </div>
            </div>
        </Fragment>

    )

}



export default UpdatePassword