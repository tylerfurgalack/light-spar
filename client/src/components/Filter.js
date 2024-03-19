import React, { useState } from "react";

const Filter = ({ onSubmit, onInputChange, onWeightChange, inputRef }) => {
  // const [isVisible, setIsVisible] = useState(false);

  // const toggleVisibility = () => {
  //   setIsVisible(!isVisible);
  // };

  return (
    <div className="card  filter-container">
      <form onSubmit={onSubmit}>
        <h3>Filter by: </h3>
        <label className="form-labels">Location:</label>
        <input
          type="text"
          name="location"
          className="form-input"
          onChange={onInputChange}
          ref={inputRef}
        ></input>
        <label className="form-labels">Weight:</label>
        <select name="Weight-Class" className="form-input" onChange={onWeightChange}>
          <option value="">Weight Class</option>
          <option value="flyweight">Flyweight (105-114lbs)</option>
          <option value="bantamweight">Bantamweight (115-121lbs)</option>
          <option value="featherweight">Featherweight (122-129lbs)</option>
          <option value="lightweight">Lightweight (130-139lbs)</option>
          <option value="welterweight">Welterweight (140-153lbs)</option>
          <option value="middleweight">Middleweight (154-167lbs)</option>
          <option value="lightheavyweight">Light Heavyweight (168-199lbs)</option>
          <option value="heavyweight">Heavyweight (200lbs or more)</option>
        </select>
        <div>
          <input type="submit" className="button" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default Filter;
