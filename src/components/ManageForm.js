import {useEffect, useState } from "react"

export default function ManageForm({employee, newData, error}){
    

    const id = employee?.id;
    const [name, setName] = useState(employee?.name);
    const [family, setFamily] = useState(employee?.family);

    useEffect(()=>{
        setName(employee?.name)
        setFamily(employee?.family)
    },[employee])


    useEffect(()=>{
        newData({id:id, name:name, family:family})
    },[id, name, family])
    
    return(
        <>
            <div className="row">
                <label className="col" htmlFor="name">
                    Name
                    <input 
                        id="name" 
                        name="name" 
                        className={`form-control ${error.key=='name' && error.status ? 'is-invalid' : ''}`} 
                        type="text" 
                        placeholder="Name" 
                        value={name} 
                        onChange={(e)=> setName(e.target.value)} 
                        autoFocus
                    />
                    {error.status && error.key=='name' && <p style={{color:'red'}} className="is-invalid">{error.msj}</p>}
                </label>
                <label className="col" htmlFor="family">
                    Family
                    <input 
                        id="family" 
                        className={`form-control ${error.key=='family' && error.status ? 'is-invalid' : ''}`}
                        type="text" 
                        placeholder="Family" 
                        value={family} 
                        onChange={(e)=>setFamily(e.target.value)} 
                    />
                    {error.status && error.key=='family' && <p style={{color:'red'}} className="is-invalid">{error.msj}</p>}
                
                </label>
            </div>

        </>
    )
}