import React from 'react'

export default function EmployeeRowComponent({ employee, handleEditClick, handleDeleteClick }) {
   
    return (
        <tr>
           
            <th scope="row">{employee._id}</th>
            <td>{employee.name}</td>
            <td>{employee.family}</td>
            <td>
                <button
                    type="button"
                    className="btn btn-success me-2"
                    onClick={() =>handleEditClick(employee)}>
                    <i className="fas fa-edit"></i>
                </button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDeleteClick(employee)}>
                    <i className="far fa-trash-alt"></i>
                </button>
            </td>
        </tr>
    )
}

