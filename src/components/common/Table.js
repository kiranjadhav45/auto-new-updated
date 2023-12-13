import React, { useState, useEffect } from "react";
const Table = ({ columns, data, itemsPerPage }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");

    const sortedData = () => {
        let sorted = [...data];

        if (sortColumn) {
            sorted = sorted.sort((a, b) => {
                const aValue = a[sortColumn];
                const bValue = b[sortColumn];

                return sortDirection === "asc"
                    ? aValue > bValue
                        ? 1
                        : -1
                    : bValue > aValue
                        ? 1
                        : -1;
            });
        }

        if (searchTerm) {
            sorted = sorted.filter((row) =>
                columns.some((column) =>
                    row[column]?.toString()?.toLowerCase()?.includes(searchTerm.toLowerCase())
                )
            );
        }


        return sorted;
    };

    const handleSort = (column) => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortDirection("asc");
        }
    };

    const totalPages = Math.ceil(sortedData().length / itemsPerPage);

    const paginatedData = sortedData().slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <table className="table">
                {/* Table header */}
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column} onClick={() => handleSort(column)}>
                                {column}{" "}
                                {sortColumn === column && (sortDirection === "asc" ? "↑" : "↓")}
                            </th>
                        ))}
                    </tr>
                </thead>
                {/* Table body */}
                <tbody>
                    {paginatedData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((column, colIndex) => (
                                <td key={colIndex}>{row[column]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Pagination */}
            <div>
                <button
                    onClick={() =>
                        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
                    }
                >
                    Previous
                </button>
                <span>{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                    onClick={() =>
                        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
                    }
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Table;



{/* <Table columns={columns} data={data} itemsPerPage={5} /> */ }


// const columns = ["Name", "Age", "Usename", "Email"];
// const data = [
//     { Name: "John Doe", Age: 25, Email: "john@example.com", Usename: "data" },
//     { Name: "Jane Doe", Age: 26, Email: "jane@example.com", Usename: "data" },
//     { Name: "Jane Doe", Age: 27, Email: "jane@example.com", Usename: "data" },
//     { Name: "Jane Doe", Age: 28, Email: "jane@example.com", Usename: "data" },
//     { Name: "Jane Doe", Age: 29, Email: "jane@example.com", Usename: "data" },
//     { Name: "Jane Doe", Age: 30, Email: "kiran@example.com", Usename: "data" },
//     {
//         Name: "kiran jadhav",
//         Age: 31,
//         Email: "jane@example.com",
//         usename: "data",
//     },
// ]