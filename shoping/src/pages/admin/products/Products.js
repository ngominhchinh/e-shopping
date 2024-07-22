import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export default function Products(){
    let [data, setData] = useState([]);

    let getAllProducts = () =>{
        axios.get('http://localhost:3000/products').then((res) => {
            setData(res.data);
        })
    }
    
    useEffect(()=>{
        getAllProducts();
    },[])
    return (
        <>
            <h1 className="text-center">List product</h1>
            <div className="container">
            <Link to={'add'}><button >Add Product</button></Link>
                <table className="table table-hover">
                    <thead>
                        <tr>  
                            <th className="col">Name </th>                      
                            <th className="col">Price</th>                            
                            <th className="col">Quantity</th>
                            <th className="col">Category</th>
                            <th className="col">Command</th>                       
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(x =>(
                            <tr>    
                                <td>{x.name}</td>
                                <td>{x.price}</td>                                
                                <td>{x.quantity}</td>
                                <td>{x.category.name}</td>
                                <td>
                                    <Link style={{ color: 'black', textDecoration: 'none' }}  to={'edit/' + x.id}>
                                    <button className="btn btn-outline-primary"> Edit </button>
                                    </Link> &nbsp;

                                    <button className="btn btn-outline-danger" onClick={() => {
                                        if(window.confirm("Are you sure you want to delete?")){
                                             axios.delete(`http://localhost:3000/products/${x.id}`).then((res) =>{
                                                 getAllProducts();
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