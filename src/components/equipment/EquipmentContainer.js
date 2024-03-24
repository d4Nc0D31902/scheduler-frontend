import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allEquipments } from "../../actions/equipmentActions";
import Equipment from "./Equipment";
import axios from "axios"; // Import axios for making API requests
import "../../Equipment.css";
import PropTypes from "prop-types";

const EquipmentContainer = () => {
  const dispatch = useDispatch();
  const { equipments, loading, error } = useSelector(
    (state) => state.allEquipments
  );

  const [sports, setSports] = useState([]); // State to store sports
  const [selectedSport, setSelectedSport] = useState(null);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/sports`
        );

        console.log("Fetched sports data:", response.data);

        setSports(response.data.sports);
      } catch (error) {
        console.error("Error fetching sports:", error);
      }
    };

    fetchSports();
    dispatch(allEquipments());
  }, [dispatch]);

  const handleSportClick = (sport) => {
    setSelectedSport((prevSelectedSport) =>
      prevSelectedSport === sport ? null : sport
    );
  };

  return (
    <Fragment>
      <header className="text-center my-5 header-design">
        <h1 className="display-4 text-uppercase font-weight-bold text-dark">
          Available Equipment
        </h1>
        <p className="lead text-muted">
          Explore our Available Equipment and find/borrow what you need
        </p>
      </header>

      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="navbar-brand mb-0">CATEGORIES</h3>
            </div>
            <div className="col-lg-10">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link"
                    onClick={() => handleSportClick(null)}
                  >
                    All Sports
                  </button>
                </li>
                {sports.map((sport) => (
                  <Fragment key={sport._id}>
                    {sport.status === "active" && (
                      <li className="nav-item">
                        <button
                          className="nav-link btn btn-link"
                          onClick={() => handleSportClick(sport.name)}
                        >
                          {sport.name}
                        </button>
                      </li>
                    )}
                  </Fragment>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <div className="row">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            equipments
              .filter(
                (equipment) =>
                  (selectedSport === null ||
                    equipment.sport === selectedSport) &&
                  equipment.status === "active"
              )
              .map((equipment) => (
                <div key={equipment._id} className="col-md-4 mb-4">
                  <Equipment equipment={equipment} />
                </div>
              ))
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default EquipmentContainer;
