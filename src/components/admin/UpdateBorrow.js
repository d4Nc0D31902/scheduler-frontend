import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layout/MetaData";
import Sidebar from "../admin/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  updateBorrow,
  getBorrowDetails,
  clearErrors,
} from "../../actions/borrowActions";
import { UPDATE_BORROW_RESET } from "../../constants/borrowConstants";

const UpdateBorrow = () => {
  const [user, setUser] = useState("");
  const [equipment, setEquipment] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [reasonBorrow, setReasonBorrow] = useState("");
  const [dateBorrow, setDateBorrow] = useState("");
  const [dateReturn, setDateReturn] = useState("");
  const [issue, setIssue] = useState("N/A");
  const [status, setStatus] = useState("Pending");
  const [reasonStatus, setReasonStatus] = useState("");

  const dispatch = useDispatch();
  const { error, borrow } = useSelector(
    (state) => state.borrowDetails || { error: null, borrow: null }
  );
  const {
    loading = false,
    error: updateError,
    isUpdated,
  } = useSelector(
    (state) => state.borrow || { loading: false, error: null, isUpdated: false }
  );
  const { id } = useParams();
  const navigate = useNavigate();

  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const formatDate = (dateTime) => {
    const formattedDate = new Date(dateTime).toISOString().slice(0, 16);
    return formattedDate;
  };

  useEffect(() => {
    if (!borrow || borrow._id !== id) {
      dispatch(getBorrowDetails(id));
    } else {
      setUser(borrow.user);
      setEquipment(borrow.equipment);
      setQuantity(borrow.quantity);
      setReasonBorrow(borrow.reason_borrow);
      setDateBorrow(formatDate(borrow.date_borrow));
      setDateReturn(formatDate(borrow.date_return));
      setIssue(borrow.issue);
      setStatus(borrow.status);
      setReasonStatus(borrow.reason_status);
    }

    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      errMsg(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      navigate("/admin/borrows");
      successMsg("Borrow updated successfully");
      dispatch({ type: UPDATE_BORROW_RESET });
    }
  }, [dispatch, error, isUpdated, navigate, updateError, borrow, id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedBorrow = {
      user,
      equipment,
      quantity,
      reason_borrow: reasonBorrow,
      date_borrow: dateBorrow,
      date_return: dateReturn,
      issue,
      status,
      reason_status: reasonStatus,
    };

    try {
      await dispatch(updateBorrow(borrow._id, updatedBorrow));

      // Display success toast and navigate on successful update
      successMsg("Borrow updated successfully");
      navigate("/admin/borrows");

      // Reset the update state
      dispatch({ type: UPDATE_BORROW_RESET });
    } catch (error) {
      // Display error toast if update fails
      errMsg("Borrow update failed. Please try again.");
    }
  };

  return (
    <Fragment>
      <MetaData title={"Update Borrow"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <div className="wrapper my-5">
            <form className="shadow-lg" onSubmit={submitHandler}>
              <h3 className="card-title" style={{ fontFamily: "sans-serif", textAlign: "center", marginBottom: "10px", margin: "20px" }}>
                <img src="/images/tupt_logo.png" style={{ width: "100px", height: "100px", marginRight: "25px" }} alt="Logo" />
                TECHNOLOGICAL UNIVERSITY OF THE PHILIPPINES
              </h3>
              <h1 className="mb-4 text-center" style={{ backgroundColor: "maroon", padding: "20px", borderRadius: "20px", color: "white" }}>Update Borrow</h1>
              <div className="form-group">
                <label htmlFor="user_field">Name:</label>
                <input
                  type="text"
                  id="user_field"
                  className="form-control"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="equipment_field">Equipment:</label>
                <input
                  type="text"
                  id="equipment_field"
                  className="form-control"
                  value={equipment}
                  onChange={(e) => setEquipment(e.target.value)}
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="quantity_field">Quantity:</label>
                <input
                  type="number"
                  id="quantity_field"
                  className="form-control"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="reasonBorrow_field">Reason for Borrow:</label>
                <input
                  type="text"
                  id="reasonBorrow_field"
                  className="form-control"
                  value={reasonBorrow}
                  onChange={(e) => setReasonBorrow(e.target.value)}
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="dateBorrow_field">Date Borrowed:</label>
                <input
                  type="datetime-local"
                  id="dateBorrow_field"
                  className="form-control"
                  value={dateBorrow}
                  onChange={(e) => setDateBorrow(e.target.value)}
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="dateReturn_field">Date Return:</label>
                <input
                  type="datetime-local"
                  id="dateReturn_field"
                  className="form-control"
                  value={dateReturn}
                  onChange={(e) => setDateReturn(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="issue_field">Issue:</label>
                <select
                  id="issue_field"
                  className="form-control"
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                >
                  <option value="N/A">N/A</option>
                  <option value="Damage">Damage</option>
                  <option value="Missing">Missing</option>
                  <option value="Incorrect Equipment">
                    Incorrect Equipment
                  </option>
                  <option value="Dirty or Unhygienic Equipment">
                    Dirty or Unhygienic Equipment
                  </option>
                  <option value="Incomplete Sets">Incomplete Sets</option>
                  <option value="Incorrect Use or Mishandling">
                    Incorrect Use or Mishandling
                  </option>
                  <option value="Stolen or Unreturned Items">
                    Stolen or Unreturned Items
                  </option>
                  <option value="Overdue">Overdue</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="status_field">Status</label>
                <select
                  id="status_field"
                  className="form-control"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Denied">Denied</option>
                  <option value="Returned">Returned</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="reasonStatus_field">Reason for Status</label>
                <input
                  type="text"
                  id="reasonStatus_field"
                  className="form-control"
                  value={reasonStatus}
                  onChange={(e) => setReasonStatus(e.target.value)}
                />
              </div>
              
              <button
                type="submit"
                className="btn btn-block py-3"
                disabled={loading ? true : false}
              >
                UPDATE
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateBorrow;
