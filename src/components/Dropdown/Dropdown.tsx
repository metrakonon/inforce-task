import React from "react";
import "./Dropdown.css";

interface DropdownProps {
  onChange: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ onChange }) => {
  return (
    <div className="dropdownContainer">
      <select onChange={(e) => onChange(e.target.value)} className="dropdown">
        <option value="alphabetic">Alphabetic</option>
        <option value="count">Count</option>
      </select>
    </div>
  );
};

export default Dropdown;
