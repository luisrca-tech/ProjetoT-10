import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const BuildingBlocksYear = ({
  year = "2023",
  selected,
  state,
  className,
}) => {
  return (
    <div className={`building-blocks-year ${className}`}>
      <div className="container">
        <div className={`state-layer ${state} selected-${selected}`}>
          <div className="year">{year}</div>
        </div>
      </div>
    </div>
  );
};

BuildingBlocksYear.propTypes = {
  year: PropTypes.string,
  selected: PropTypes.bool,
  state: PropTypes.oneOf(["enabled", "focused", "pressed", "disabled"]),
};
