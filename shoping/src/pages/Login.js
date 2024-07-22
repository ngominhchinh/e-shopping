import {Form, Field, Formik} from 'formik';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { useContext, useState } from 'react';
import { MyContext } from '../MyContext';

export default function Login() {
    let navigate = useNavigate();        
    let [cxt, setCxt] = useContext(MyContext);
  return (
    <>
      <div className="row mt-5 pt-5">
        <div className="offset-4">
        <div className="col-4 text-center login p-5">
          <h1>Login</h1>
          <button className="btn btn-outline-warning">
            <Link to={"register"}>Register</Link>
          </button>
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            onSubmit={(values) => {
              axios
                .post("http://localhost:3000/users/login", values)
                .then((x) => {
                  alert("Đăng nhập thành công!");
                  
                  navigate("/products");
                  sessionStorage.setItem("user", JSON.stringify(x.data));
                })
                .catch((e) => {
                  alert("Tài khoản hoặc mật khẩu sai!");
                });
            }}
          >
            <Form>
              <div className="form-group text-left">
                <label>Username</label>
                <Field
                  name={"username"}
                  className={"form-control"}
                  placeholder="Input your username"
                />
              </div>
              <div className="form-group text-left">
                <label>Password</label>
                <Field
                  name={"password"} type="password"
                  className={"form-control"}
                  placeholder="Input your password"
                />
              </div>
              <button className="btn btn-primary mt-3">Login</button>
            </Form>
          </Formik>
        </div>
        </div>
      </div>
    </>
  );
}

