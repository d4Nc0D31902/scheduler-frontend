// EquipmentContainer.js
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allEquipments } from "../../actions/equipmentActions";
import Equipment from "./Equipment";
import axios from "axios"; // Import axios for making API requests
import "../../Equipment.css";

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
      <div className="wrappe" style={{ display: "flex" }}>
        <div className="sidebar">
          <h2>Categories</h2>
          <ul>
            <li onClick={() => handleSportClick(null)}>All Sports</li>
            {sports.map((sport) => (
              <Fragment key={sport._id}>
                {sport.status === "active" && (
                  <li onClick={() => handleSportClick(sport.name)}>
                    {sport.name}
                  </li>
                )}
              </Fragment>
            ))}
          </ul>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="main-content" style={{ marginTop: "30px" }}>
                <h2 style={{ fontFamily: "monospace", fontWeight: "bold" }}>
                  Available Equipments
                </h2>
                {loading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p>Error: {error}</p>
                ) : (
                  <div className="row">
                    {equipments
                      .filter((equipment) => {
                        if (selectedSport === null) {
                          return true;
                        }
                        return equipment.sport === selectedSport;
                      })
                      .map((equipment) => (
                        <div key={equipment._id} className="col-md-3">
                          <Equipment equipment={equipment} />
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EquipmentContainer;
