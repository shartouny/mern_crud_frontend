import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap"
import ManageForm from "./ManageForm"

export default function Popup({ popupData, setPopupData, showPopup, setShowPopup,  method, onSubmit }) {

    const [newEmployeeData, setNewEmployeeData] = useState({});
    const [data, setData] = useState();

    const [error, setError] = useState({
        status: false,
        key: '',
        msj: ''
    })



    const closePopup = () => {
        setShowPopup(false)
        setPopupData(null);
        setError({
            status: false,
            key: '',
            msj: ''
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let submitData = method === 'Delete' ? popupData : newEmployeeData;
        if (method != 'Delete') {
            if (validate(submitData)) {
                onSubmit(submitData)
                closePopup()
            }
        } else {
            onSubmit(submitData)
        }

    }

    useEffect(() => {
        console.log('new employee data', newEmployeeData);
    }, [newEmployeeData])

    const validate = (d) => {

        if (d?.name == '') {
            setError(prev => {
                return { ...prev, status: true, key: 'name', msj: 'Name cant be empty' };
            })
            return false
        }
        if (d?.family == '') {
            setError(prev => {
                return { ...prev, status: true, key: 'family', msj: 'Family cant be empty' };
            })

            return false;
        }
        // if (data.employees.find(employee => employee.name == d.name && employee.id != d.id) != null) {
        //     setError(prev => {
        //         return { ...prev, status: true, key: 'name', msj: 'Client already exist' };
        //     })

        //     return false;
        // }
        return true
    }

    return (

        <Modal show={showPopup} onHide={closePopup}>
            <form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h2 className={method === 'Delete' || method === 'Delete Selected' ? "text-danger" : "text-info"}>
                            {method === 'Delete' ? 'Warning !!!' : method + ' Client'}
                        </h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        method === 'Delete' ?
                            'Are you sure you want to delete ' + popupData?.name + ' ' + popupData?.family + '?' :
                            <ManageForm
                                employee={popupData}
                                newData={(data) => setNewEmployeeData(data)}
                                error={error}
                            />
                    }

                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant={method === 'Delete' || method === 'Delete Selected' ? 'danger' : 'success'} >
                        {method === 'Delete' || method === 'Delete Selected' ? 'Proceed' : 'Save'}
                    </Button>
                    <Button variant="secondary" onClick={closePopup}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </form >
        </Modal>

    )
}
