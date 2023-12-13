

const CheckBox = ({ options = [], onCheckboxChange }) => {
    const handleCheckboxChange = (e, value) => {
        const isChecked = e.target.checked;
        const updatedOptions = options.map((option) =>
            option.value === value ? { ...option, checked: isChecked } : option
        );
        onCheckboxChange(updatedOptions);
    };
    return (
        <div>
            {options.map((option, index) => (
                <div key={index} className="d-flex align-items-center">
                    <input
                        onChange={(e) => handleCheckboxChange(e, option.value)}
                        type="checkbox"
                        id={`checkbox_${index}`}
                        name={`checkbox_${index}`}
                        value={option.value}
                        checked={option.checked || false}
                    />
                    <label className="ms-2" htmlFor={`checkbox_${index}`}>
                        {option.title}
                    </label>
                </div>
            ))}
        </div>
    );
};

export default CheckBox;

// const [checkboxOptions, setCheckboxOptions] = useState([
//     { title: "Option 1", value: "option1", checked: false },
//     { title: "Option 2", value: "option2", checked: false },
//     // Add more objects for additional checkboxes as needed
//   ]);

//   const handleCheckboxChange = (updatedOptions) => {
//     setCheckboxOptions(updatedOptions);
//     // console.log(checkboxOptions);
//   };
//   useEffect(() => {
//     console.log(checkboxOptions);
//   }, [checkboxOptions]);

{
    /* <CheckBox options={checkboxOptions} onCheckboxChange={handleCheckboxChange} />; */
}
