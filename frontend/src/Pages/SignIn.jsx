import React from "react";
import axios from "axios";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { ClipLoader } from "react-spinners";

function SignIn() {
  const primaryColor = "#ff4d2d";
  const hovercolor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";
  const navigate = useNavigate();
  const [showPassword, setshowPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true)
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      console.log(result)
       setError("")
       setLoading(false)
    } catch (error) {
      setError(error?.response?.data?.message)
      setLoading(false)
    }
  };

  const handleGoogleAuth = async()=>{
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    try {
      const {data} = await axios.post(`${serverUrl}/api/auth/google-auth`,{
        email: result.user.email,
      },{withCredentials: true})

      console.log(data)
    } catch (error) {
      setError(error?.response?.data?.message)
    }
  }


  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{
        border: `1px solid ${bgColor}`,
      }}
    >
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px]"
        style={{
          border: `1px solid ${borderColor}`,
        }}
      >
        <h1
          className="text-3xl font-bold mb-2"
          style={{
            color: primaryColor,
          }}
        >
          Biggy
        </h1>

        <p className="text-gray-600 mb-6">
          Sign In to your account to get started with delicious food
        </p>

        {/* {email} */}

        <div className="mb-3">
          <label htmlFor="email" className="text-gray-700 font-medium mb-2">
            email
          </label>
          <input
            type="email"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none"
            placeholder="Enter your email"
            style={{ border: `1px solid ${borderColor}` }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
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

        {/* {forgot password} */}

        <div className="text-right mb-4 text-[#e64323] font-medium hover:text-[#aa2409] cursor-pointer" onClick={()=> navigate("/forgotPassword")}>
          Forgot password
        </div>

        <button
          className={`w-full font-semibold py-2  gap-2 border rounded-lg transition duration-200
       bg-[#ff4d2d] text-white cursor-pointer hover:bg-[#e64323] `}
          onClick={handleSignIn}
          disabled= {loading}
        >
          {loading?<ClipLoader size={20} color="white"/>:"Sign In"}
        </button>

        {error && <p className="text-red-500 text-center">*{error}</p>}

        <button
          className="w-full mt-4 flex items-cener justify-center gap-2 cursor-pointer
        border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-100"
        onClick={handleGoogleAuth}
        >
          <FcGoogle size={20} />
          <span>Sign up with Google</span>
        </button>

        <p
          className="text-center mt-5 cursor-pointer "
          onClick={() => navigate("/signup")}
        >
          Want to create an account ?
          <span className="text-[#ff4d2d] hover:text-[#f48672]">Sign Up</span>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
