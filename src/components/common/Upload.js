import React, { useState } from "react";
import './styles.css'

const Upload = ({ onChange, fileSize, fileType, title }) => {
    const handleFileUpload = (event) => {
        let selectedFile = event?.target?.files[0];

        // File type validation
        // const allowedTypes = ["image/jpeg", "image/png", "application/pdf"]; // Allowed file types
        const allowedTypes = fileType;
        if (!allowedTypes.includes(selectedFile.type)) {
            event.target.value = "";
            return onChange(`Invalid file type. Please upload valid file.`);
        }

        // File size validation (in bytes)
        const maxSizeMB = fileSize || 5;
        const maxSizeBytes = maxSizeMB * 1024 * 1024;
        if (selectedFile.size > maxSizeBytes) {
            event.target.value = "";
            return onChange(
                `File size exceeds ${maxSizeMB}MB. Please upload a smaller file.`
            );
        }

        // changing name of the file
        const modifiedFileName = `user_01.${selectedFile.name.split(".").pop()}`;
        const modified = new File([selectedFile], modifiedFileName, {
            type: selectedFile.type,
        });

        return onChange("File is valid", modified);
    };

    const generateRandomId = () => {
        const min = 100000; // Minimum 6-digit number
        const max = 999999; // Maximum 6-digit number
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const randomId = generateRandomId();
    return (
        <div>
            <input
                className="d-none"
                id={randomId}
                onChange={handleFileUpload}
                type="file"
            />
            <label className="cursor-pointer file-upload-button" htmlFor={randomId}>
                {title || "Choose file"}
            </label>
        </div>
    );
};

export default Upload;