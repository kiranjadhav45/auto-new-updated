import React from 'react';

const RadioButtonGroup = ({ options, onChange }) => {
    return (
        <div>
            {options.map((option, index) => (
                <label key={index} className='mx-2'>
                    <input type="radio" onChange={onChange} name="radioButton" value={option} />
                    {option}
                </label>
            ))}
        </div>
    );
};

export default RadioButtonGroup;


// const handleRadioChange = (event) => {
//     console.log(event.target.value)
// };
// const fourOptions = ["Option 1", "Option 2", "Option 3", "Option 4"];


{/* <RadioButtonGroup onChange={handleRadioChange} options={fourOptions} /> */ }