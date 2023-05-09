import React from "react";
import PropTypes from "prop-types";
import { BsCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";

const SortDir = ({ direction }) => {
    return direction === "asc" ? <BsFillCaretUpFill /> : <BsCaretDownFill />;
};

SortDir.propTypes = { direction: PropTypes.string };
export default SortDir;
