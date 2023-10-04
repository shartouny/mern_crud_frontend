import React, { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
// import Pagination from '../pagination/Pagination';
import '@fortawesome/fontawesome-free/css/all.min.css'
import EmployeeRowComponent from '../components/EmployeeRowComponent';
import Popup from '../components/Popup';
import axios from 'axios';

export default function ManageEmployees() {
    const [employees, setEmployees] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [method, setMethod] = useState();

    const [popupData, setPopupData] = useState();

    useEffect(()=>{
        axios.get('http://localhost:3005/getEmployees')
        .then(res=>setEmployees(res.data))
        .catch(err=>console.log(err));
    },[])

    const handleAddClick = () =>{
        setMethod('Add')
        setShowPopup(true);
        console.log('click');
    }

    const handleEditClick = (employee) => {
        axios.get(`http://localhost:3005/getEmployee/${employee._id}`)
        .then(res=>{console.log(res)})
        .catch(err=>console.log(err))
        
        setMethod('Edit');
        setShowPopup(true)
        setPopupData(employee)
    }

    const handleDeleteClick = (employee) => {
        setMethod('Delete')
        setShowPopup(true);
        setPopupData(employee)
    }

    const handleSubmit = (data) => { 
        if (method === 'Add') {
            axios.post('http://localhost:3005/createEmployee', data).then((res)=>{
                setEmployees(prev=>([...prev, res.data``]))
            })
        }
        else if (method === 'Edit') {
            console.log('data from edit', data);
            setEmployees(employees?.map((employee) => employee.id === data.id ? data : employee));
        }
        else if (method === 'Delete') {
            console.log('data drom delete', data);
            setEmployees(employees?.filter(employee => employee.id !== data.id));
        }
    }

    const [EmployeesPerPage, setEmployeesPerPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastEmployee = currentPage * EmployeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - EmployeesPerPage
    const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

    const totalPages = Math.ceil(employees.length / EmployeesPerPage);

    useEffect(() => {
        if (currentEmployees.length == 0 && currentPage != 1) {
            setCurrentPage(prev => prev - 1)
        }
    }, [currentEmployees])


    return (
        <div className="container mt-5">
            <div className="table-title">
                <div className="row">
                    <div className="col-sm-6">
                        <h2>Manage <b>Employees</b></h2>
                    </div>
                    <div className="col-sm-6 text-end">
                        <button title='Add New Employee' className="btn btn-success" data-toggle="modal" onClick={handleAddClick}>
                            <i className="fa fa-plus"></i>
                            {/* <span>Add New Employee</span> */}
                        </button>
                    </div>
                </div>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Family</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentEmployees.map((employee) => (
                            <EmployeeRowComponent
                                employees={employees}
                                employee={employee}
                                handleEditClick={handleEditClick}
                                handleDeleteClick={handleDeleteClick}
                            />
                        ))
                    }
                </tbody>
            </table>

            {/* <Pagination
                data={employees}
                paginatedData={currentEmployees}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
            /> */}
            <Popup
                onSubmit={handleSubmit}
                method={method}
                popupData={popupData}
                setPopupData={setPopupData}
                showPopup={showPopup}
                setShowPopup={setShowPopup}
                />
        </div>
    )
}