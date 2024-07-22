import { Link, useNavigate } from "react-router-dom";

export default function AdminNavbar(){
    let navigate = useNavigate();
    return(
        <>
            <div className="container">
                
                    <Link className="no-underline" to='users'>Users </Link>   &nbsp; | &nbsp;
                    <Link to='products'>Products </Link>   &nbsp; | &nbsp;
                    <Link to='carts'>Carts</Link> 
                    <button onClick={() => {navigate('/products')}}>User</button>
                    
            </div>
            
            <hr/>
        </>
    )
}