import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { countries } from "countries-list";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../actions/cartActions";

const Shipping = () => {
  const countriesList = Object.values(countries);
  const { shippingInfo } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const [phoneNoError, setPhoneNoError] = useState("");
  const country = "Philippines"; // Set country as constant
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const validatePostalCode = (postalCode) => {
    // Philippine postal code format validation
    if (!/^\d{4}$/.test(postalCode)) {
      alert("Please enter a valid Philippine postal code (4 digits).");
      return false;
    }
    return true;
  };

  const validatePhoneNumber = (phoneNo) => {
    // Philippine phone number format validation
    if (!/^(09|\+639)\d{9}$/.test(phoneNo)) {
      setPhoneNoError("Please enter a valid phone number.");
      return false;
    }
    setPhoneNoError("");
    return true;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!address || !city || !postalCode || !phoneNo) {
      alert("Please fill in all fields.");
      return;
    }

    if (!validatePostalCode(postalCode) || !validatePhoneNumber(phoneNo)) {
      return;
    }

    dispatch(saveShippingInfo({ address, city, phoneNo, postalCode, country }));
    navigate("/confirm");
  };

  return (
    <Fragment>
      <MetaData title={"Shipping Info"} />
      <CheckoutSteps shipping />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card p-4 shadow border-0 rounded">
              <h2 className="text-center mb-4">Your Information</h2>
              <form onSubmit={submitHandler}>
                <div className="mb-3">
                  <label htmlFor="address_field" className="form-label">Address</label>
                  <input
                    type="text"
                    id="address_field"
                    className="form-control"
                    placeholder="Enter your address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="city_field" className="form-label">City</label>
                  <input
                    type="text"
                    id="city_field"
                    className="form-control"
                    placeholder="Enter your city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone_field" className="form-label">Mobile Number</label>
                  <input
                    type="tel"
                    id="phone_field"
                    className={`form-control ${phoneNoError ? "border border-danger" : ""}`}
                    placeholder="Enter your phone number (e.g. 09123456789)"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    required
                  />
                  {phoneNoError && <div className="text-danger">{phoneNoError}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="postal_code_field" className="form-label">Postal Code</label>
                  <input
                    type="text"
                    id="postal_code_field"
                    className="form-control"
                    placeholder="Enter your postal code"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="country_field" className="form-label">Country</label>
                  <input
                    type="text"
                    id="country_field"
                    className="form-control"
                    value={country}
                    readOnly
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">CONTINUE</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;