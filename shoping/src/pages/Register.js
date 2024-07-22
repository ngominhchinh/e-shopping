import axios from 'axios';
import {Field, Form, Formik} from 'formik';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Login.css';
export default function Register(){
    let navigate = useNavigate();
    return(
        <>
            <div className="row mt-5 pt-5">
                <div className="offset-4">
                    <div className="col-4 text-center login p-5">
                        <h1>Register</h1>
                        <button className="btn btn-outline-warning">
                            <Link to={"/"}>Login</Link>
                        </button>
                        <Formik initialValues={{
                            username: "",
                            password: "",
                            name:"",
                            dob:""
                        }} onSubmit={(values)=>{
                            axios.post('http://localhost:3000/users/register', values).then(x =>{
                                alert('Dang ky thanh cong');
                                navigate('/');
                            }).catch(e => {
                                alert(e.response.data.message);
                            })
                        }}>
                            <Form>                                                           
                                <div className="form-group text-left">
                                    <Field name={"username"} className={"form-control mb-3 mt-3"} placeholder='Input your username' />
                                </div>
                                
                                <div className="form-group text-left">
                                    <Field type='password' name={"password"} className={"form-control  mb-3"} placeholder='Input your password' />
                                </div>
                                <div className="form-group text-left">
                                    <Field name={"name"} className={"form-control  mb-3"} placeholder='Input your name' />
                                </div>                                                                                               
                                <div className="form-group text-left">
                                    <Field name={"dob"} className={"form-control  mb-3"} />
                                </div>
                                <div className="form-group text-left">
                                    <button className='btn btn-outline-primary'>Register</button>
                                </div>
                                
                            </Form>
                        </Formik>
                    </div>
                </div>
                </div>
        </>
    )
}