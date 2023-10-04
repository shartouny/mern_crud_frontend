import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
    return (
        <>
            <div className="container h-100-vh d-flex align-items-center">

                <div className="row justify-content-center w-100">
                    <div className="col-12 text-center">
                        <h1>Welcome to this Employees Management System</h1>
                        <p>Please Click Here To Add/Edit or delete an Employee</p>
                        <Link to={'/manage-employees'} className='btn btn-info'>Manage Employees</Link>
                    </div>
                </div>
            </div>
        </>

    )
}
