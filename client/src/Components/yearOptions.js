import React from "react";

const yearOptions = () => {
  let optionArr = [];
  for (let year = 2017; year >= 1975; year--) {
    optionArr.push(<option value={year}>{year}</option>);
  }
  return optionArr;
};

export default yearOptions;
