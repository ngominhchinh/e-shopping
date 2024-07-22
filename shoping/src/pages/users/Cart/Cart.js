import React, { useContext, useEffect, useState } from "react";
import Nav from "../../../components/Nav";
import { MyContext } from "../../../MyContext";
import { Link } from "react-router-dom";
import axios from "axios";
export default function Cart(){
    
    let [productsInCart,setProductsInCart] = useState([{
        id:'',
        name:'',
        price:'',
        quantity:'',
        total:''
    }]);
    let [cart, setCart] = useState([{
        id:'',
        user:'',
        total:'',
        date:'',
        products:[]
    }]);   
    let id = null;
    const user =  JSON.parse(sessionStorage.getItem('user'));
    if(user){
        id = user.user.id;
    }    
    let totalPrice = 0;
    useEffect(()=>{        
        axios.get('http://localhost:3000/carts/user/'+user.user.id).then((res) =>{    
            console.log(id);                    
            setCart(res.data);
            setProductsInCart(res.data.products)            
        })
    },[]);    
    
    return(
        <>
           <Nav></Nav>
           <div className="pt-5">
                <h1 className="mt-5">Cart</h1>
                <h4>Tong tien: {cart.total} - item: {productsInCart.length}</h4>

                <div className="p-5">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            
                            <th className="col">Name</th>
                            <th className="col">Unit price</th>
                            <th className="col">Quantity</th>
                            <th className="col">Price</th>
                            <th className="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                       
                            {productsInCart.map((p,index) =>{
                                let t = p.quantity*p.price;
                                totalPrice += t;
                                return (
                                    <tr key={p.id}>
                                        <td>{p.name}</td>
                                        <td>{p.price}</td>
                                        <td>{p.quantity}</td>
                                        <td>{p.price * p.quantity}</td>
                                        <td><button className="btn btn-outline-danger" onClick={()=>{
                                            if(window.confirm("Are you sure you want to delete?")){
                                                axios.delete(`http://localhost:3000/carts/${user.user.id}/${p.id}`).then((res)=>{
                                                    alert('Delete Successed');
                                                    setCart(res.data);
                                                    setProductsInCart(res.data.products)   
                                                }).catch((err)=>{
                                                    alert('Delete failed');
                                                })
                                            }                                            
                                        }}><i className="fa-solid fa-trash"></i></button></td>
                                        
                                    </tr>
                                )
                                 
                            })}
                            <tr>
                                <td colSpan="3" className="text-right "><strong>Total</strong></td>
                                <td colSpan="3"><strong>${totalPrice}</strong></td>
                            </tr>
                       
                    </tbody>
                </table>
                </div>
                

           </div>           
           
        </>
    )
}