import React, { useEffect } from 'react';
import {
    MDBCard,
    MDBCardFooter,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBBtn,
    MDBIcon,
    MDBContainer,
    MDBCardGroup,
    MDBCol,

 
} from 'mdb-react-ui-kit'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBlogsByuser } from '../redux/features/blogSlice';

const Dashboard = () => {

    const {user} = useSelector((state) => ({ ...state.auth}));
    const {userBlogs, loading} = useSelector((state) => ({ ...state.blog}));
    const userId = user?.result?._id;
    const dispatch = useDispatch();
    console.log(user)


    useEffect(() => {
        if(userId){
            dispatch(getBlogsByuser(userId))
        }
    }, [userId]);




  return (
    <div style={{marginTop: "200px"}}>Dashboard</div>
  )
}

export default Dashboard