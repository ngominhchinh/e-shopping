import axios from "axios";
import { useEffect, useState } from "react"

export default function ListCarts(){
    let [data, setData] = useState([]);

    let getAllCarts = () =>{
        axios.get('http://localhost:3000/carts').then((res) =>{
            const sortedData = res.data.sort((a,b) =>new Date(b.date) - new Date(a.date));
            setData(sortedData);
        })
    }
    useEffect(()=>{
        getAllCarts();
    },[])
    return (
        <> 
        <h1 className="text-center">List Carts</h1>
            <div className="container">
                <table className="table table-hover">
                    <thead>
                        <tr>  
                            <th className="col">Date </th>                      
                            <th className="col">Username</th>                            
                            <th className="col">Total price</th>
                            <th className="col">Total item</th>
                            <th className="col">Command</th>                       
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(x =>(
                            <tr>    
                                <td>{x.date}</td>
                                <td>{x.user.username}</td>                                
                                <td>{x.total}</td>
                                <td>{x.products.length}</td>
                                <td>
                                    <button className="btn btn-outline-danger" onClick={() => {
                                        if(window.confirm("Are you sure you want to delete?")){
                                             axios.delete(`http://localhost:3000/carts/${x.id}`).then((res) =>{
                                                 getAllCarts();
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