import axios from "axios";
import { useEffect, useState } from "react"

export default function ListUsers(){
    let [data, setData] = useState([]);

    let getUsers = () =>{
        axios.get('http://localhost:3000/users').then((res) =>{
            setData(res.data);
        })
    }
    useEffect(()=>{
        getUsers();
    },[])
    return (
        <>
        <h1 className="text-center">User</h1>
            <div className="container">
                
                <table className="table table-hover">
                    <thead>
                        <tr>                        
                            <th className="col">Id</th>
                            <th className="col">Name</th>
                            <th className="col">Username</th>
                            <th className="col">DOB</th>
                            <th className="col">Command</th>                       
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(x =>(
                            <tr>
                                <td>{x.id}</td>
                                <td>{x.name}</td>
                                <td>{x.username}</td>
                                <td>{x.dob}</td>
                                <td>                                   
                                    <button className="btn btn-outline-danger" onClick={() => {
                                        if(window.confirm("Are you sure you want to delete?")){
                                            axios.delete(`http://localhost:3000/users/${x.id}`)
                                           .then(res => {
                                                getUsers();
                                           })
                                           
                                        }
                                        
                                    }}>Delete</button>
                                </td>                        
                            </tr>
                            
                        ))}
                    </tbody>
                </table>
            </div>
            
        </>
    )
}