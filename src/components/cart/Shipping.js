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
  const country = "Philippines"; // Set country as constant
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!address || !city || !postalCode || !phoneNo) {
      alert("Please fill in all fields.");
      return;
    }

    // Additional validation can be added here, such as checking postal code format, phone number format, etc.
    // For example:
    // if (!/^\d{5}$/.test(postalCode)) {
    //   alert("Please enter a valid postal code.");
    //   return;
    // }

    dispatch(saveShippingInfo({ address, city, phoneNo, postalCode, country }));
    navigate("/confirm");
  };

  return (
    <Fragment>
      <MetaData title={"Shipping Info"} />
      <CheckoutSteps shipping />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-4">Information</h1>
            <div className="form-group">
              <label htmlFor="address_field">Address</label>
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
            <div className="form-group">
              <label htmlFor="city_field">City</label>
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

            <div className="form-group">
              <label htmlFor="phone_field">Phone No</label>
              <input
                type="tel"
                id="phone_field"
                className="form-control"
                placeholder="Enter your phone number"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="postal_code_field">Postal Code</label>
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
            <div className="form-group">
              <label htmlFor="country_field">Country</label>
              <input
                type="text"
                id="country_field"
                className="form-control"
                value={country}
                readOnly
              />
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

export default Shipping;
