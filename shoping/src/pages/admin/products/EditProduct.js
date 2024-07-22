import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EditProduct(){
    let {id} = useParams();
    let [categories, setCategories] = useState([]);
    let [selected, setSelected] = useState(0);
    let [data, setData] = useState();
    useEffect(()=>{
        axios.get('http://localhost:3000/categories').then((item) =>{
            setCategories(item.data);
        })
    },[]);
    useEffect(() =>{
        axios.get('http://localhost:3000/products/' +id).then ((res) =>{
            setData(res.data);
        })
        
    },[])
    return(
        <>
            <h1>Edit Product</h1>
            
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6">
                    <Formik initialValues={data} enableReinitialize={true} 
                            onSubmit={(values) =>{
                                console.log(values);
                                let category = categories.find(c => c.id == selected);
                                if(category === undefined){
                                    category = categories[0];
                                }
                                values = {...values,id,category}
                                axios.put('http://localhost:3000/products/' +id,values).then((res) =>{
                                    alert("Product edited successfully");                            
                                }).catch(err =>{
                                    alert("Failed to edit product");
                                    console.log(err);
                                })
                            }}>
                        <Form>
                            <Field className="form-control" name='name' placeholder="Enter product name here"/>
                            <Field className="form-control mt-3" name='price' type="number" step='1' placeholder="Enter product price here"/>
                            <Field className="form-control mt-3" name='quantity' type="number" step='1' placeholder="Enter product quantity here"/>

                            <select className="form-select mt-3" value={data}  onChange={(e) => setSelected(e.target.value)} >

                                {categories.map((x) =>(
                                    <option value={x.id}>{x.name}</option>
                                ))}
                                
                            </select>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary mt-3">Edit Product</button>
                            </div>
                            
                        </Form>
                    </Formik>
                
                </div>
                <div className="col-3"></div>
            </div>
        </>
    )
}