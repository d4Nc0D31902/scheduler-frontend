import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { countries } from "countries-list";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../actions/cartActions";
import {
  Container,
  Grid,
  Card,
  Typography,
  TextField,
  InputLabel,
  Box,
  Button,
} from "@mui/material";
import InputMask from "react-input-mask"; // Import InputMask

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
    if (!/^\(\+63\)\d{2}-\d{4}-\d{4}$/.test(phoneNo)) {
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
      <Container className="mt-5">
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={6}>
            <Card className="p-4 shadow border-0 rounded">
              <Typography variant="h2" align="center" gutterBottom>
                Your Information
              </Typography>
              <form onSubmit={submitHandler}>
                <Box mb={3}>
                  <InputLabel htmlFor="address_field">Address</InputLabel>
                  <TextField
                    id="address_field"
                    variant="outlined"
                    fullWidth
                    placeholder="Enter your address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </Box>
                <Box mb={3}>
                  <InputLabel htmlFor="city_field">City</InputLabel>
                  <TextField
                    id="city_field"
                    variant="outlined"
                    fullWidth
                    placeholder="Enter your city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </Box>
                <Box mb={3}>
                  <InputLabel htmlFor="phone_field">Mobile Number</InputLabel>
                  <InputMask
                    mask="(+63)99-9999-9999"
                    maskChar="_"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    placeholder="(+63)__-____-____"
                  >
                    {(inputProps) => (
                      <TextField
                        {...inputProps}
                        id="phone_field"
                        variant="outlined"
                        fullWidth
                        error={phoneNoError ? true : false}
                        helperText={phoneNoError}
                        required
                      />
                    )}
                  </InputMask>
                </Box>

                <Box mb={3}>
                  <InputLabel htmlFor="postal_code_field">
                    Postal Code
                  </InputLabel>
                  <TextField
                    id="postal_code_field"
                    variant="outlined"
                    fullWidth
                    placeholder="Enter your postal code"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                  />
                </Box>
                <Box mb={3}>
                  <InputLabel htmlFor="country_field">Country</InputLabel>
                  <TextField
                    id="country_field"
                    variant="outlined"
                    fullWidth
                    value={country}
                    readOnly
                    disabled
                  />
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  CONTINUE
                </Button>
              </form>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Shipping;
