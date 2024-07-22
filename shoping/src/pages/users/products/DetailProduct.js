import { Link, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from 'react';
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';
import axios from "axios";
import { MyContext } from "../../../MyContext";
export default function DetailProduct() {
  let {id} = useParams('');
  let [cxt, setCxt] = useContext(MyContext);  
  let user =  JSON.parse(sessionStorage.getItem('user'));
  let [data, setData] = useState({
    name:"",
    price:"",
    quantity:"",
    category:"",
    images:[]
  });

  // let [cart, setCart] = useState({
  //   user: { 
  //     id: '', 
  //     username: ''
  //   },
  //   total: '',
  //   date: '',
  //   products: []
  // })
 
  useEffect(()=>{
    axios.get('http://localhost:3000/products/' + id).then(res =>{
      setData(res.data);      
    })           
  },[])  
  
  return (
    <>        
        <div className="row pt-5">
          <div className="col-2">
          {data.images.map((image,index)=>(
                   
                      <img src={image} className='d-block w-100 m-3' alt={image} style={{height:"100px"}} />                                                      
                                           
                ))}                
          </div>

          <div className="col-4">            
            <MDBCarousel showControls showIndicators interval={2500}>
                {data.images.map((image,index)=>(
                    <MDBCarouselItem itemId={index}>
                      <img src={image} className='d-block w-100' alt={image}  />                                                      
                  </MDBCarouselItem>                                 
                ))}                
            </MDBCarousel>             
          </div>
          <div className="col-4 mx-auto my-auto">
            <h3>{data.name}</h3>
            <h6>Price: ${data.price}</h6>
            <h6>Category: {data.category.name}</h6>
            {user.user?(
              <button className="btn btn-primary" onClick={() =>{                
                let c = {
                  user: { 
                    id: user.user.id, 
                    username: user.user.username
                  },
                  total: data.price*1,
                  date: "",
                  products: [{
                    id: data.id,
                    name: data.name,
                    price: data.price,
                    quantity: 1
                  }]
                }
                axios.post('http://localhost:3000/carts',c).then((res) =>{
                  
                  alert('Add to cart success');
                }).catch(err =>{
                  alert('Add to cart failed');
                })

              }}>Add to Cart</button>

            ):(<Link to={'/'} className="btn btn-primary">Add </Link>)}
          </div>

          <div className="col-2">           
          </div>                   
          
        </div>  
        
        <p>User Id: {user.user.id}</p>      
        <p>Username: Id: {user.user.id} - name:{user.user.username}</p>    
        <p>Product: id: {data.id} - name: {data.name} - price: {data.price} - quantity: {1}</p>
        <p>Total: {data.price*1}</p>
    </>
  );
}