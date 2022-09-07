import React from 'react'
import { useState,useEffect  } from 'react'
import {MDBCard, MDBCardBody, MDBInput, MDBCardFooter, MDBValidation,MDBValidationItem , MDBBtn,
MDBIcon,
MDBSpnner} from "mdb-react-ui-kit"
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { login } from '../redux/features/authSlice';



const initalState = {
    email: "",
    password: ""
}
const Login = () => {
    const [formValue, setFormValue] = useState(initalState);
    const {email, password} = formValue;
    const dispatch = useDispatch();
    const navigate = useNavigate()

     const handleSubmit = (e) => {
        e.preventDefault();
        if(email && password){
            dispatch(login({
                formValue, 
                navigate,
                toast
            }))
        }

     };
     const onInputChange = (e) => {
        let {name, value} = e.target;
        setFormValue({ ...formValue, [name]: value})

     };



  return (
    <div
    style={{
        margin: 'auto',
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px"
    }}
    >
        <MDBCard alignment='center'>
            <MDBIcon fas icon="user-circle" className='fa-3x' />
            <h5>Sign In</h5>
            <MDBCardBody>
                <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3'>
                    <MDBValidationItem className='col-md-12' feedback='Please provide a valid email.' invalid >
                    <div className='col-md-12'>
                        <MDBInput
                        label="Email"
                        type="email"
                        value={email}
                        name="email"
                        onChange={onInputChange}
                        required
                        invalid
                        validation="please provide your email"
                        id='validationCustom01'
                         />
                    </div>

                    </MDBValidationItem>
                    <MDBValidationItem className='col-md-12' feedback='Please provide a valid Password.' invalid>
                    <div className='col-md-12'>
                        <MDBInput
                        label="Password"
                        type="password"
                        value={password}
                        name="password"
                        onChange={onInputChange}
                        required
                        invalid
                        validation="please provide your password"
                         />
                    </div>

                    </MDBValidationItem>
                    <div className='col-12'>
                        <MDBBtn style={{width: "100%"}} className="mt-2">
                            Login
                        </MDBBtn>

                    </div>

                </MDBValidation>
            </MDBCardBody>
            <MDBCardFooter>
                <Link to="/register">
                    Don't have an account ? Sign Up
                </Link>
            </MDBCardFooter>

        </MDBCard>
    </div>
  )
}

export default Login