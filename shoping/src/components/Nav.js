import { useContext, useEffect, useState } from "react"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../MyContext";

export default function Nav(){

    let[categories, setCategories] = useState([]);    
    let[selectedCategoryId,setSelectedCategoryId] = useState(0)
    let [cxt, setCxt] = useContext(MyContext);    
    let [userin, setUserin] = useState(null);
    let navigate = useNavigate();
    // useEffect(()=>{
    //     axios.get('http://localhost:3000/categories').then(x =>{
    //         setCategories(x.data);            
    //     })    
    //     const user =  JSON.parse(sessionStorage.getItem('user'));       
    //     if (user){
    //         setUserin(user);           
    //         setCxt({...cxt, user:user});
    //     }
    // },[])   
    function findCart(user){
        let all = axios.get('http://localhost:3000/carts').then((res) =>{
            return res.data.find(x=>x.user.id == user.user.id);
        })
    }
    let cart;
    const user = JSON.parse(sessionStorage.getItem('user'));
    if(user){
        cart = findCart(user);                
    }
    useEffect(()=>{
        axios.get('http://localhost:3000/categories').then(x =>{
            setCategories(x.data);            
        });     
         
    },[cart])   
    return(
        <>
                  
            <div>
                <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top mb-3 p-3">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to={"/products"}>EShop</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                                
                            </li>
                            
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Category
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link to={'/products'} className="dropdown-item" value="0" onClick={()=>setCxt({...cxt,selectedCategoryId:0})}>All</Link></li>
                                    {categories.map(item =>(
                                        <li><Link to={'/products'}  className="dropdown-item" value={item.id}  onClick={(e)=> setCxt({...cxt,selectedCategoryId: item.id})}>{item.name}</Link></li>
                                    ))}                                    
                                </ul>
                            </li>   
                            <li className="nav-item">
                            {/* {userin?(
                                     <Link to={'/cart'} className="nav-link ">Cart</Link>
                                    ):(<Link to={'/'} className="nav-link ">Cart chua login</Link>)} */}
                               
                            </li>      
                            <li className="nav-item">
                                <a className="nav-link" href="#">About us</a>
                            </li>                   
                            <li className="nav-item">
                                <Link className="nav-link" to={'/admin'}>Admin</Link>
                            </li>
                            
                        </ul>
                        <form className="d-flex mr-5" role="search">
                            <input style={{width:'400px'}} className="form-control m-1" type="search" placeholder="Search" aria-label="Search" onChange={(e) =>{setCxt({...cxt,searchValue:e.target.value})}}/>
                            {user  ? (
                                 <p className="mt-2">Xin chào: {user.user.username} </p>
                                 
                            ):(<p className="mt-2"></p>)}                                                         
                            
                        </form>
                        
                        </div>
                        {user?(<>
                            <button style={{ outline: 'none' }} type="button" className="btn"><Link to={'/cart'}><i className="fa-solid fa-cart-shopping"></i></Link></button>
                            <button className="btn btn-outline-primary" onClick={() => {sessionStorage.removeItem('user'); navigate('/')}}>Logout</button></>)                            
                            : (<button><Link to={'/'} className="nav-link ">Register</Link></button>
                        )}
                        
                    </div>
                </nav>
            </div>
            
        </>
    )
}