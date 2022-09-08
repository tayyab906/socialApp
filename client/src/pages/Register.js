import React from 'react'
import { useState,useEffect  } from 'react'
import {MDBCard, MDBCardBody, MDBInput, MDBCardFooter, MDBValidation,MDBValidationItem , MDBBtn,
MDBIcon,
MDBSpinner} from "mdb-react-ui-kit"
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { register } from '../redux/features/authSlice';



const initalState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
}
const Register = () => {
    const {loading, error} = useSelector((state) => ({ ...state.auth}))
    const [formValue, setFormValue] = useState(initalState);
    const {email, password, firstName, lastName, confirmPassword} = formValue;
    const dispatch = useDispatch();
    const navigate = useNavigate()

     const handleSubmit = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
          return toast.error("Paassword sholud match")
        }
        if(email && password && firstName && lastName && confirmPassword){
            dispatch(register({
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
            <h5>Sign Up</h5>
            <MDBCardBody>
                <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3'>
                <MDBValidationItem className='col-md-6' feedback='Please provide a valid FirstName.' invalid >
                    <div className='col-md-12'>
                        <MDBInput
                        label="First Name"
                        type="text"
                        value={firstName}
                        name="firstName"
                        onChange={onInputChange}
                        required
                        invalid
                        validation="please provide your firstName"
                        id='validationCustom01'
                         />
                    </div>

                    </MDBValidationItem>
                    <MDBValidationItem className='col-md-6' feedback='Please provide a valid lastName.' invalid >
                    <div className='col-md-12'>
                        <MDBInput
                        label="last Name"
                        type="text"
                        value={lastName}
                        name="lastName"
                        onChange={onInputChange}
                        required
                        invalid
                        validation="please provide your lastName"
                        id='validationCustom01'
                         />
                    </div>

                    </MDBValidationItem>
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
                    <MDBValidationItem className='col-md-12' feedback='Please provide a valid confirmPassword.' invalid>
                    <div className='col-md-12'>
                        <MDBInput
                        label="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        name="confirmPassword"
                        onChange={onInputChange}
                        required
                        invalid
                        validation="please provide your confirmPassword"
                         />
                    </div>

                    </MDBValidationItem>
                    <div className='col-12'>
                        <MDBBtn style={{width: "100%"}} className="mt-2">
                        { loading && (
                        <MDBSpinner size='sm' role="status" tag="span" className='me-2' />
                    )}
                            Register
                        </MDBBtn>

                    </div>

                </MDBValidation>
            </MDBCardBody>
            <MDBCardFooter>
                <Link to="/login">
                    Already have a account ? Sign In
                </Link>
            </MDBCardFooter>

        </MDBCard>
    </div>
  )
}

export default Register;