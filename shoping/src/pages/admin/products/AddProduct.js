import { Formik, Form, Field } from "formik";
import React, { useEffect, useState } from "react"
import axios from "axios";
import { imageDb } from "../../../firebase";
import { getDownloadURL, listAll, ref, uploadBytes , uploadBytesResumable,} from "firebase/storage";
import { v4 } from "uuid";


export default function AddProduct(){
    let [categories, setCategories] = useState([]);
    let [selected, setSelected] = useState(0);
   
    let [images, setImages] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
   

    let handleChange = (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            let newImage = e.target.files[i];           
            setImages((prevState) => [...prevState, newImage]);
        }
    };

    const handleUpload = async () => {      
        const uploadPromises = images.map((image) => {
          const imgRef = ref(imageDb, `files/${v4()}`);
          return uploadBytes(imgRef, image)
            .then((snapshot) => getDownloadURL(snapshot.ref))
            .catch((error) => {
              console.log("Error uploading image:", error);
              throw error;
            });
        });
    
        try {
            const urls = await Promise.all(uploadPromises);
            setImageUrls((prevUrls) => [...prevUrls, ...urls]);
            alert('Uploaded Firebase');
        } catch (error) {
          console.log("Error uploading images:", error);
        }
        
    };
   
    let renderFileList = () =>(
        <>
            <div className="imgflex">
            {[...images].map((f) =>(                
                <img src={URL.createObjectURL(f)} alt={f.name} style={{width: "100px", height: "100px",margin:"10px"}}/>                
            ))}
        </div>        
        </>        
    )           
    useEffect(()=>{
        axios.get('http://localhost:3000/categories').then((item) =>{
            setCategories(item.data);
        })
       
    },[]);    

    return (
        <>
            <div className="row">
                <h1>Add Product</h1>
                <div className="col-3">
                   
                </div>
                <div className="col-6">

                    <Formik initialValues={{
                        name:'',
                        price:'',
                        category:{},
                        quantity:'',
                        images:''

                    }} onSubmit={(values) =>{
                        //handleUpload();
                        
                        let category = categories.find(c => c.id == selected);
                        if(category === undefined){
                            category = categories[0];
                        }
                        
                        values = {...values,category,images:imageUrls};
                        
                        axios.post('http://localhost:3000/products',values).then((res) =>{
                            alert("Product added successfully");                            
                        }).catch(err =>{
                            alert("Failed to add product");
                            console.log(err);
                        })
                    }}>
                        <Form>
                            <Field className="form-control" name='name' placeholder="Enter product name here"/>
                            <Field className="form-control mt-3" name='price' type="number" step='1' placeholder="Enter product price here"/>
                            <Field className="form-control mt-3" name='quantity' type="number" step='1' placeholder="Enter product quantity here"/>
                            <select className="form-select mt-3" onChange={(e) => setSelected(e.target.value)}>
                                {categories.map((x) =>(
                                    <option value={x.id}>{x.name}</option>
                                ))}                                
                            </select>
                            <input type="file" multiple accept="image/*"  onChange={handleChange}/>
                            <button type="button" onClick={handleUpload}>Upload Firebase</button>
                            {renderFileList()}                                                       
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary mt-3" >Add Product</button>
                            </div>                            
                        </Form>
                    </Formik>                
                    
                </div>
                <div className="col-3"></div>
            </div>
        </>
    )
}