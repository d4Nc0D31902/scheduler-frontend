
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import BorrowingSteps from "./BorrowingSteps";
import { useDispatch, useSelector } from "react-redux";
import { createBorrow, clearErrors } from "../../actions/borrowActions";
import { clearBorrowCart } from "../../actions/borrowCartActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Borrow = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [borrowingInfo, setBorrowingInfo] = useState({
    date_borrow: "",
    reason_borrow: "",
  });

  const [agreeTerms, setAgreeTerms] = useState(false); // Define agreeTerms state

  const error = useSelector((state) => state.newBorrow.error);
  const borrowCartItems = useSelector(
    (state) => state.borrowCart.borrowCartItems
  );
  const userId = useSelector((state) => state.auth.user._id);

  const getMinDateTime = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    const hours = currentDate.getHours().toString().padStart(2, "0");
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  useEffect(() => {
    const storedBorrowCart = localStorage.getItem("borrowCartItems");
    if (storedBorrowCart) {
      dispatch({
        type: "LOAD_BORROW_CART",
        payload: JSON.parse(storedBorrowCart),
      });
    }
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const submitHandler = async (e) => {
    e.preventDefault();
    document.querySelector("#pay_btn").disabled = true;

    if (!borrowingInfo.date_borrow) {
      toast.error("Please select a date for borrowing.");
      return;
    }

    if (!agreeTerms) {
      toast.error("Please agree to the Terms and Agreement.");
      return;
    }

    const borrow = {
      borrowItems: borrowCartItems,
      borrowingInfo,
      userId,
    };

    dispatch(createBorrow(borrow))
      .then(() => {
        dispatch(clearBorrowCart());
        localStorage.removeItem("borrowCartItems");
        toast.success("Borrow Request Successful!");
        navigate("/equipmentz");
        window.location.reload(); // Reload the page
      })
      .catch((error) => {
        console.error("Error creating borrow:", error);
      });
  };

  return (
    <Fragment>
      <MetaData title={"Borrow"} />
      <BorrowingSteps borrowingInfo confirmBorrow borrow />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-4">Borrowing Information</h1>

            <div className="form-group">
              <label htmlFor="date_borrow_field">Date of Request:</label>
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
                min={getMinDateTime()}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="reason_borrow_field">Reason of Request:</label>
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
              id="pay_btn"
              type="button"
              className="btn btn-block py-3"
              onClick={() => setAgreeTerms(true)}
              data-toggle="modal"
              data-target="#termsModal"
            >
              BORROW
            </button>
          </form>
        </div>
      </div>

      <div
        className="modal fade"
        id="termsModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="termsModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="termsModalLabel">  <img
                src="/images/tupt_logo.png"
                style={{
                  width: "65px",
                  height: "65px",
                  marginRight: "5px",
                }}
                alt="Logo"
              />TERMS AND AGREEMENTS</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>
                Welcome to TUP-T Grayhawks! By accessing or utilizing our services, you agree to abide by the following terms and conditions. These terms govern the use of our website, products, and services offered by TUP-T Grayhawks.
              </p>
              <p>
                <strong>Acceptance of Terms:</strong> Your access to or use of our services indicates your acceptance of these terms of agreement. If you disagree with any part of these terms, kindly refrain from accessing or using our services.
              </p>
              <p>
                <strong>Use of Services:</strong> Our services are provided on an "as is" and "as available" basis. You agree to utilize our services solely for lawful purposes and in compliance with all applicable laws and regulations.
              </p>
              <p>
                <strong>Intellectual Property:</strong> All content accessible through our services, including but not limited to text, graphics, logos, button icons, images, audio clips, digital downloads, and data compilations, is the exclusive property of TUP-T Grayhawks or its content suppliers and is protected by international copyright laws.
              </p>
              <p>
                <strong>Privacy Policy:</strong> We value your privacy. Please review our <a href="#privacyPolicyLink">Privacy Policy</a>, which governs your use of our services, to understand our data handling practices.
              </p>
              <p>
                <strong>Same Item, Higher Price Policy:</strong> Occasionally, due to market dynamics or other factors, the price of an item may fluctuate without prior notice. While we endeavor to maintain consistent pricing, we retain the right to adjust prices as necessary. By agreeing to these terms, you acknowledge that the price of an item may be higher than previously advertised.
              </p>
              <p>
                <strong>Limitation of Liability:</strong> Under no circumstances shall TUP-T Grayhawks, its officers, directors, employees, or agents be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of our services, without regard to its conflict of law provisions.
              </p>
              <p>
                <strong>Changes to Terms:</strong> TUP-T Grayhawks reserves the right to modify or replace these terms at any time without prior notice. It is your responsibility to periodically review these terms for any changes. Your continued use of our services after any modifications to these terms constitutes acceptance of the revised terms.
              </p>
              <p>
                Thank you for choosing TUP-T Grayhawks.
              </p>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="agreeCheckbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} />
                <label className="form-check-label" htmlFor="agreeCheckbox">I agree to the Terms and Agreement</label>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={submitHandler} disabled={!agreeTerms}>Agree and Borrow</button>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </Fragment>
  );
};

export default Borrow;
