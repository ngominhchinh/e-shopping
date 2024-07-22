import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import { MyContext } from "../../../MyContext";

export default function ListProduct(){
    let navigate = useNavigate();
    let [cxt, setCxt] = useContext(MyContext);
    let [selected, setSelected] = useState(0);  
    let [list, setList] = useState([{
        name:"",
        price:"",
        quantity:"",
        category:{
            name:""
        },
        images:[]
    }])    
    
    let getList = () =>{
        axios.get('http://localhost:3000/products').then((res) =>{
            
            let list = res.data;
            let nlist;        
            if(Number(cxt.selectedCategoryId) == 0 ){
                nlist = [...list];
            } else{
                nlist = list.filter(e => e.category.id == Number(cxt.selectedCategoryId));
            }        
            if(cxt.searchValue!= ""){
                nlist = nlist.filter(e => e.name.toLowerCase().includes(cxt.searchValue.toLowerCase()));
            }
            if(selected == '1'){
                nlist = nlist.sort((a, b) => a.price - b.price);
               
            } else if(selected =='2'){
                nlist = nlist.sort((a, b) => b.price - a.price);
                
            }
            
            setList(nlist);
        })
    }        
    useEffect(()=>{
        getList();
        
    },[cxt,selected])   
    

    return(
        <>            
            <div className="col-2 mt-5 ">
                <select className="form-select" id="floatingSelect" aria-label="Floating label select example" onChange={(e)=>{setSelected(e.target.value);}}>                   
                    <option value="0">Default</option>
                    <option value="1">Low to high</option>
                    <option value="2">High to low</option>
                </select>
            </div>
            
                                       
            <div className="row mt-5">           
                {                                   
                    list.map(e => (
                    <div className="col-3 mt-3">
                        <div className="card" style={{width: '18rem'}}>
                            <Link to = {'detail/' + e.id}> <img src={e.images[0]} className="card-img-top" alt={e.name} style={{height:'150px'}}/> </Link>
                            <div className="card-body text-center">
                                <h5 className="card-title">{e.name}</h5>                                
                                <Link className="btn btn-primary"
                                    to = {'detail/' + e.id}
                                >Detail</Link>
                            </div>
                        </div>
                    </div>
                    
                ))}
             </div>
        </>
    )    
    
}