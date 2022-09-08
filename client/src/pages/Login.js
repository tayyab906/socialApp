import React from 'react'
import { useState,useEffect  } from 'react'
import {MDBCard, MDBCardBody, MDBInput, MDBCardFooter, MDBValidation,MDBValidationItem , MDBBtn,
MDBIcon,
MDBSpinner} from "mdb-react-ui-kit"
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { googleSignIn, login } from '../redux/features/authSlice';
import { GoogleLogin } from "react-google-login";



const initalState = {
    email: "",
    password: ""
}
const Login = () => {
    const {loading, error} = useSelector((state) => ({ ...state.auth}))
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

     useEffect(() => {
        error && toast.error(error)

     }, [error])




     const onInputChange = (e) => {
        let {name, value} = e.target;
        setFormValue({ ...formValue, [name]: value})

     };

     const googleSuccess = (res) => {
        const email = res?.prfileObj.email;
        const name = res?.prfileObj.name;
        const token = res?.tokenId;
        const googleId = res?.googleId;
        const result = {email, name, token, googleId}
        dispatch(googleSignIn({result, navigate, toast}))


     };
     const googleFailure = (error) => {
        console.log(error)

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
                        { loading && (
                        <MDBSpinner size='sm' role="status" tag="span" className='me-2' />
                    )}
                            Login
                        </MDBBtn>

                    </div>

                </MDBValidation>
                <br />
                <GoogleLogin
            clientId="..."
            render={(renderProps) => (
              <MDBBtn
                style={{ width: "100%" }}
                color="danger"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <MDBIcon className="me-2" fab icon="google" /> Google Sign In
              </MDBBtn>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
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