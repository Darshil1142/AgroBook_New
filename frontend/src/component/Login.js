import React, { useState } from 'react';
import AgroLogin from '../images/AgroLogin.mp4';
import { Link } from "react-router-dom"
import swal from "sweetalert"
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppState } from '../App';
import { useData } from '../useContext/DataContext';
import { jwtDecode } from 'jwt-decode'
import axios from 'axios';

const Login = () => {
  const useAppState = useContext(AppState);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  const { setData } = useData();
  const { setshopname } = useData();

  async function validateData() {
    const url = "http://localhost:4000/auth/login";
    const res = await axios.post(url, formData, { withCredentials: true });
    console.log(res);
    const data = res.data;
    const jwtToken = data.jwtToken;
    const user = jwtDecode(jwtToken).user;
    const username = user.username;
    const shopname = user.shopname;
    const userId = user.id;
    useAppState.setUserId(userId)
    console.log(username)
    console.log(shopname)
    console.log("Darshil")
    console.log(userId);
    setData(username);
    setshopname(shopname);

    if (res.status == 200) {
      useAppState.setLogin(true);
      swal({
        title: "Successfully Loged In",
        icon: "success",
        button: false,
        timer: 3000
      })

      // setFormData({
      //   name: "",
      //   email: "",
      //   password: "",
      //   confirmPassword: ""
      // });

      navigate("/dashboard")

    }
    else {
      swal({
        title: data["message"],
        icon: "error",
        button: false,
        timer: 3000
      })
    }

  }

  const handleSubmit = (e) => {
    try {
      e.preventDefault()
      validateData()

    } catch (err) {
      swal({
        title: err,
        icon: "error",
        button: false,
        timer: 3000
      })
    }
  };


  return (

    <div className="min-h-screen flex items-center justify-center">

      <video
        className="absolute top-0 left-0 object-cover w-full h-full opacity-80 z-0"
        loop
        autoPlay
        muted
      >
        <source
          src={AgroLogin}
          type="video/mp4"
        />
      </video>

      <div className="w-full opacity-80 max-w-md p-6 bg-white rounded-lg shadow-lg z-10">
        <h2 className="text-2xl text-center font-semibold mb-6"><span className='text-green-600 no-underline hover:underline hover:cursor-pointer'>Welcome Back</span>! Login to Explore Agrobook.</h2>
        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="block w-full px-4 py-3 mb-4 border rounded-lg placeholder-gray-600 bg-slate-200 text-gray-800"
            placeholder="Enter Your Email"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="block w-full px-4 py-3 mb-4 border rounded-lg placeholder-gray-600 bg-slate-200 text-gray-800"
            placeholder="Enter Password"
            required
          />

          <button
            type="submit"
            className="w-full py-3 text-white bg-green-500 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Log In
          </button>
        </form>
        <p className="mt-4 text-center p-2 text-2xl text-gray-700 text-sm">
          Do not have account ?
          <Link to="/signup" className="ml-1 text-green-500 font-semibold">
            Sign Up
          </Link>
        </p>
        <p className=" text-center font-bold text-2xl text-gray-700 text-sm">
          Forgot Password
          <Link to="/forgot" className=" hover:underline decoration-4 ml-1 text-green-500 font-semibold">
            Click Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
