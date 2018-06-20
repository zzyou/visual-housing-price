import React from "react";

const yearOptions = () => {
  let yearOptionArr = [];
  for (let year = 2017; year >= 1975; year--) {
    yearOptionArr.push(
      <option key={year} value={year}>
        {year}
      </option>
    );
  }
  return yearOptionArr;
};

export default yearOptions;
