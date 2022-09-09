import './App.css';
import { ToastContainer } from "react-toastify";
import { Routes, Route } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './componenets/Header';
import { useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { setUser } from './redux/features/authSlice';
import AddEditBlog from './pages/AddEditBlog';
import SingleBlog from './pages/SingleBlog';
import Dashboard from './pages/Dashboard';
import Private from './componenets/Private';

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    dispatch(setUser(user));
  }, []);



  return (
    <div className="App">
      <Header />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/addBlog'
          element={
            <Private>
              <AddEditBlog />
            </Private>
          } />
        <Route path='/blog/:id' element={<SingleBlog />} />
        <Route
          path='/addblog/:id'
          element={
            <Private>
              <AddEditBlog />
            </Private>
          } />
        <Route
          path='/dashboard'
          element={
            <Private>
              <Dashboard />

            </Private>
          } />

      </Routes>
    </div>
  );
}

export default App;
