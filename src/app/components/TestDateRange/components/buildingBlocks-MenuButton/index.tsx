import PropTypes from "prop-types";
import React from "react";
import { ArrowDropDown24Px } from "./ArrowDropDown24Px";
import "./style.css";

export const BuildingBlocksMenu = ({ labelText = "Label", state, className }) => {
  return (
    <div className={building-blocks-menu ${className}}>
      <div className={state-layer ${state}}>
        <div className="label-text">{labelText}</div>
        <ArrowDropDown24Px className="icon" color="#49454F" />
      </div>
    </div>
  );
};

BuildingBlocksMenu.propTypes = {
  labelText: PropTypes.string,
  state: PropTypes.oneOf(["enabled", "pressed", "focused", "disabled"]),
};