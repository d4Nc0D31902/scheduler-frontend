import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  allUsers,
  clearErrors,
  deleteUser,
  deactivateUser,
  reactivateUser,
} from "../../actions/userActions";
import {
  DELETE_USER_RESET,
  DEACTIVATE_USER_RESET,
  REACTIVATE_USER_RESET,
} from "../../constants/userConstants";

const UsersList = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { loading, error, users } = useSelector((state) => state.allUsers);
  const { isDeleted } = useSelector((state) => state.user);
  const { isDeactivated, isReactivated } =
    useSelector((state) => state.user) || {};
  const errMsg = (message = "") =>
    toast.error(message, { position: toast.POSITION.BOTTOM_CENTER });
  const successMsg = (message = "") =>
    toast.success(message, { position: toast.POSITION.BOTTOM_CENTER });

  const [filter, setFilter] = useState("All");

  useEffect(() => {
    dispatch(allUsers());
    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }
    if (isDeactivated) {
      successMsg("User deactivated successfully");
      console.log("User deactivated:", isDeactivated);
      dispatch({ type: DEACTIVATE_USER_RESET });
    }
    if (isReactivated) {
      successMsg("User reactivated successfully");
      console.log("User reactivated:", isReactivated);
      dispatch({ type: REACTIVATE_USER_RESET });
    }
  }, [dispatch, error, isDeactivated, isReactivated]);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  const toggleUserActivation = async (id, isDeactivated) => {
    if (isDeactivated) {
      await dispatch(reactivateUser(id));
      successMsg("User Reactivated Successfully");
      console.log("User reactivated:", id);
    } else {
      await dispatch(deactivateUser(id));
      successMsg("User Deactivated Successfully");
      console.log("User deactivated:", id);
    }
    dispatch(allUsers());
  };

  const setUsers = () => {
    let filteredUsers = users;
    if (filter !== "All") {
      filteredUsers = users.filter((user) => user.role === filter);
    }

    const data = {
      columns: [
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Role",
          field: "role",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    filteredUsers.forEach((user) => {
      if (user.sched_penalty === "3" || user.borr_penalty === "3") {
        user.sched_penalty = "0";
        user.borr_penalty = "0";
      }

      const roleClass =
        user.role === "user"
          ? "text-primary"
          : user.role === "officer"
          ? "text-danger"
          : user.role === "professor"
          ? "text-warning"
          : user.role === "admin"
          ? "text-success"
          : "";

      data.rows.push({
        name: user.name,
        email: user.email,
        role: <span className={roleClass}>{user.role}</span>,
        actions: (
          <Fragment>
            {user.status === "active" && (
              <Link
                to={`/admin/user/${user._id}`}
                className="btn btn-primary py-1 px-2"
              >
                <i className="fa fa-pencil"></i>
              </Link>
            )}
            <button
              className={`btn ${
                user.status === "inactive" ? "btn-success" : "btn-danger"
              } py-1 px-2 ml-2`}
              onClick={() =>
                toggleUserActivation(user._id, user.status === "inactive")
              }
            >
              <i
                className={`fa ${
                  user.status === "inactive"
                    ? "fa-check-circle"
                    : "fa-times-circle"
                }`}
              ></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"All Users"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Users</h1>
            <div>
              <label htmlFor="roleFilter">Filter by Role:</label>
              <select
                value={filter}
                className="form-control"
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="All">All</option>
                <option value="admin">Admin</option>
                <option value="officer">Officer</option>
                <option value="professor">Professor</option>
                <option value="user">User</option>
              </select>
            </div>
            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setUsers()}
                className="px-3"
                bordered
                striped
                hover
              />
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default UsersList;
