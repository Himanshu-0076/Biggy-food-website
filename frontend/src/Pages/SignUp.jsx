import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaRegEyeSlash } from "react-icons/fa6";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";

function SignUp() {
  const primaryColor = "#ff4d2d";
  const hovercolor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";
  const [showPassword, setshowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");

  const handleSignUp = async() =>{
    try {
      const result = await axios.post(`${serverUrl}/api/auth/signup`,{
        fullName,email,password,mobile,role
      },{withCredentials: true})
      console.log(result)
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4 "
      style={{ backgroundColor: bgColor }}
    >
      <div
        className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px]`}
        style={{
          border: `1px solid ${borderColor}`,
        }}
      >
        <h1
          className={`text-3xl font-bold mb-2`}
          style={{ color: primaryColor }}
        >
          Biggy
        </h1>
        <p className="text-gray-600 mb-6">
          Create your account to get started with delicious food deliveries
        </p>

        {/* full Name*/}

        <div className="mb-3">
          <label
            htmlFor="fullName"
            className="block text-gray-700 font-medium mb-1"
          >
            Full Name
          </label>
          <input
            typr="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none "
            placeholder="Enter your Full Name"
            style={{ border: `1px solid ${borderColor}` }}
            onChange={(e)=> setFullName(e.target.value)}
            value={fullName}
          />
        </div>

        {/* email */}

        <div className="mb-3">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-1"
          >
            Email
          </label>
          <input
            type="email"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none "
            placeholder="Enter your email"
            style={{ border: `1px solid ${borderColor}` }}
            onChange = {(e)=> setEmail(e.target.value)}
            value={email}
          />
        </div>

        {/* Mobile */}

        <div className="mb-3">
          <label
            htmlFor="mobile"
            className="block text-gray-700 font-medium mb-1"
          >
            Mobile
          </label>
          <input
            type="mobile"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none"
            placeholder="phone"
            style={{ border: `1px solid ${borderColor}` }}
            onChange = {(e)=> setMobile(e.target.value)}
            value={mobile}
          />
        </div>

        {/* Password */}

        <div className="mb-3">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-1"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={`${showPassword ? "text" : "password"}`}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none"
              placeholder="enter password"
              style={{ border: `1px solid ${borderColor}` }}
              onChange = {(e)=> setPassword(e.target.value)}
              value={password}
            />

            <button
              className="absolute right-3 top-[14px] text-gray-500 "
              onClick={() => {
                setshowPassword((prev) => !prev);
              }}
            >
              {!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
        </div>

        {/* Role */}

        <div className="mb-4">
          <label
            htmlFor="role"
            className="block text-gray-7-- font-medium mb-1"
          >
            Role
          </label>
          <div className="flex gap-2">
            {["user", "owner", "deliveryBoy"].map((r) => (
              <button
                className="flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors cursor-pointer"
                onClick={() => setRole(r)}
                style={
                  role == r
                    ? { backgroundColor: primaryColor, color: "white" }
                    : {
                        border: `1px solid ${primaryColor}`,
                        color: primaryColor,
                      }
                }
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      <button className={`w-full font-semibold py-2  gap-2 border rounded-lg transition duration-200
       bg-[#ff4d2d] text-white cursor-pointer hover:bg-[#e64323] `
      } onClick= {handleSignUp}
      >
            Sign Up
      </button>

      <button className="w-full mt-4 flex items-center justify-center gap-2 cursor-pointer
      border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-100">
        <FcGoogle size={20}/>
        <span>Sign up with Google</span>
      </button>
      <p className="text-center mt-5 cursor-pointer " onClick={()=>navigate("/SignIn")}>Already have an account ? <span className="text-[#ff4d2d] hover:text-[#f48672]">Sign In</span></p>
      </div>
    </div>
  );
}

export default SignUp;
