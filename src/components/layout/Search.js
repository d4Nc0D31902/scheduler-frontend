import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/store");
    }
  };

  return (
    <form onSubmit={searchHandler}>
      <div className="input-group">
        <input
          type="text"
          id="search_field"
          className="form-control"
          placeholder="Search for merchandise..."
          onChange={(e) => setKeyword(e.target.value)}
          style={{
            border: "2px solid #ddd",
            borderRadius: "20px",
            padding: "10px 20px",
            marginRight: "10px",
            fontSize: "16px",
            outline: "none",
            boxShadow: "none",
            transition: "border-color 0.3s ease",
          }}
        />
        <div>
          <button
            id="search_btn"
            className="btn btn-primary"
            style={{
              borderRadius: "20px",
              padding: "10px 20px",
              fontSize: "16px",
              boxShadow: "none",
              transition: "background-color 0.3s ease",
            }}
          >
            <i className="fa fa-search" aria-hidden="true"></i> Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default Search;