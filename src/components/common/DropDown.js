// Dropdown.js
import React from 'react';

const Dropdown = ({ options, selectedValue, onChange }) => {
    return (
        <select style={{ boxShadow: "none" }} class="form-select" value={selectedValue} onChange={onChange}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Dropdown;






// const [selectedOption, setSelectedOption] = useState('');

// const handleDropdownChange = (event) => {
//     setSelectedOption(event.target.value);
// };

// const dropdownOptions = [
//     { value: 'option1', label: 'Option 1' },
//     { value: 'option2', label: 'Option 2' },
//     { value: 'option3', label: 'Option 3' },
// ];

{/* <div>
        <h1>Your Main Component</h1>
        <Dropdown options={dropdownOptions} selectedValue={selectedOption} onChange={handleDropdownChange} />
        <p>Selected Option: {selectedOption}</p>
      </div>
      <div className='bottom-navbar'>
        <NavbarBottom />
      </div> */}