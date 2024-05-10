import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import "./style.css";

export const BuildingBlocks = ({
  endRange = false,
  startRange = false,
  extraLeft = true,
  date = "00",
  extraRight = true,
  type,
  stateProp,
  className,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    type: type  "default",
    state: stateProp  "enabled",
  });

  return (
    <div
      className={building-blocks ${state.type} ${state.state} ${className}}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
    >
      {["default", "null", "prev-next", "selected", "today"].includes(state.type) && (
        <div className="container">
          <div className="state-layer">
            {(state.state === "disabled" 
              state.state === "enabled" 
              state.state === "focused" 
              state.state === "hovered" 
              (state.state === "pressed" && state.type === "selected") ||
              (state.state === "pressed" && state.type === "today")) && (
              <div className="date">
                {["default", "prev-next", "selected", "today"].includes(state.type) && <>{date}</>}
              </div>
            )}

            {state.type === "default" && state.state === "pressed" && (
              <>
                <div className="text-wrapper">{date}</div>
                <img className="ripple" alt="Ripple" src="image.svg" />
              </>
            )}
          </div>
        </div>
      )}

      {state.type === "selected-middle" && (
        <>
          <>{extraLeft && <div className="range-highlight-end" />}</>
          <div className="range-highlight" />
          <>{extraRight && <div className="div" />}</>
          <div className="state-layer-2">
            <div className="date-2">{date}</div>
            {state.state === "pressed" && <img className="ripple" alt="Ripple" src="ripple.svg" />}
          </div>
        </>
      )}
    </div>
  );
};

function reducer(state, action) {
  switch (action) {
    case "mouse_enter":
      return {
        ...state,
        state: "hovered",
      };

    case "mouse_leave":
      return {
        ...state,
        state: "enabled",
      };
  }

  return state;
}

BuildingBlocks.propTypes = {
  endRange: PropTypes.bool,
  startRange: PropTypes.bool,
  extraLeft: PropTypes.bool,
  date: PropTypes.string,
  extraRight: PropTypes.bool,
  type: PropTypes.oneOf(["prev-next", "selected-middle", "default", "today", "selected", "null"]),
  stateProp: PropTypes.oneOf(["enabled", "focused", "pressed", "hovered", "disabled"]),
};