import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import BorrowingSteps from "./BorrowingSteps";
import { useDispatch, useSelector } from "react-redux";
import { saveBorrowingInfo } from "../../actions/borrowCartActions";

const BorrowingInfo = () => {
  const { borrowCartItems } = useSelector((state) => state.borrowCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Load borrowingInfo from sessionStorage or initialize with default values
  const [borrowingInfo, setBorrowingInfo] = useState(() => {
    const savedBorrowingInfo = sessionStorage.getItem("borrowingInfo");
    return savedBorrowingInfo
      ? JSON.parse(savedBorrowingInfo)
      : {
          date_borrow: new Date().toISOString().slice(0, 16), // Initial value is current datetime
          reason_borrow: "",
        };
  });

  // Update sessionStorage whenever borrowingInfo changes
  useEffect(() => {
    sessionStorage.setItem("borrowingInfo", JSON.stringify(borrowingInfo));
  }, [borrowingInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    // Validate other form fields if needed

    dispatch(
      saveBorrowingInfo({ borrowItems: borrowCartItems, borrowingInfo })
    );
    navigate("/confirmBorrow", { state: { borrowingInfo } }); // Pass borrowingInfo as state parameter
  };

  return (
    <Fragment>
      <MetaData title={"Borrowing Info"} />
      <BorrowingSteps borrowingInfo />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-4">Borrowing Information</h1>

            <div className="form-group">
              <label htmlFor="date_borrow_field">Date Borrow</label>
              <input
                type="datetime-local"
                id="date_borrow_field"
                className="form-control"
                value={borrowingInfo.date_borrow}
                onChange={(e) =>
                  setBorrowingInfo({
                    ...borrowingInfo,
                    date_borrow: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="reason_borrow_field">Reason for Borrow</label>
              <select
                id="reason_borrow_field"
                className="form-control"
                value={borrowingInfo.reason_borrow}
                onChange={(e) =>
                  setBorrowingInfo({
                    ...borrowingInfo,
                    reason_borrow: e.target.value,
                  })
                }
                required
              >
                <option value="" disabled selected>
                  Select a reason
                </option>
                <option value="For Play">For Play</option>
                <option value="PE Class">PE Class</option>
                <option value="For Event">For Event</option>
              </select>
            </div>

            <button
              id="shipping_btn"
              type="submit"
              className="btn btn-block py-3"
            >
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default BorrowingInfo;
