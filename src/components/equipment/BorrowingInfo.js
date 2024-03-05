import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import BorrowingSteps from "./BorrowingSteps";
import { useDispatch, useSelector } from "react-redux";
import { saveBorrowingInfo } from "../../actions/borrowCartActions";
import { MDBInput, MDBBtn, MDBIcon } from "mdb-react-ui-kit";

const BorrowingInfo = () => {
  const { borrowCartItems } = useSelector((state) => state.borrowCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [borrowingInfo, setBorrowingInfo] = useState(() => {
    const savedBorrowingInfo = sessionStorage.getItem("borrowingInfo");
    return savedBorrowingInfo
      ? JSON.parse(savedBorrowingInfo)
      : {
        date_borrow: new Date().toISOString().slice(0, 16),
        reason_borrow: "",
      };
  });

  useEffect(() => {
    sessionStorage.setItem("borrowingInfo", JSON.stringify(borrowingInfo));
  }, [borrowingInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      saveBorrowingInfo({ borrowItems: borrowCartItems, borrowingInfo })
    );
    navigate("/confirmBorrow", { state: { borrowingInfo } });
  };

  return (
    <Fragment>
      <MetaData title={"Borrowing Info"} />
      <BorrowingSteps borrowingInfo />
      <div className="container my-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={submitHandler}>
              <h2 className="mb-4">Borrowing Information</h2>

              <MDBInput
                label="Date Borrow"
                type="datetime-local"
                id="date_borrow_field"
                value={borrowingInfo.date_borrow}
                onChange={(e) =>
                  setBorrowingInfo({
                    ...borrowingInfo,
                    date_borrow: e.target.value,
                  })
                }
                required
              />

              <MDBInput
                label="Reason for Borrow"
                type="select"
                id="reason_borrow_field"
                value={borrowingInfo.reason_borrow}
                onChange={(e) =>
                  setBorrowingInfo({
                    ...borrowingInfo,
                    reason_borrow: e.target.value,
                  })
                }
                required
              >
                <option value="" disabled>Select a reason</option>
                <option value="For Play">For Play</option>
                <option value="PE Class">PE Class</option>
                <option value="For Event">For Event</option>
              </MDBInput>

              <MDBBtn
                id="shipping_btn"
                type="submit"
                className="btn btn-primary btn-block btn-lg mt-4"
              >
                <MDBIcon icon="paper-plane" className="me-2" />
                CONTINUE
              </MDBBtn>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BorrowingInfo;