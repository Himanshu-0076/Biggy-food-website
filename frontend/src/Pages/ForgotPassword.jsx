import axios from "axios";
import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { ClipLoader } from "react-spinners";

function ForgotPassword() {
  const borderColor = "#ddd";
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async() =>{
    setLoading(true)
    try {
      const result = await axios.post(`${serverUrl}/api/auth/send-otp`, {email},
        {withCredentials: true}
      )
      console.log("send otp result", result)
      setError("")
      setStep(2)
      setLoading(false)
    } catch (error) {
      setError(error?.response?.data?.message)
      setLoading(false)
    }
  }

  const handleVerifyOtp = async() => {
    setLoading(true)
    try {
      const result = await axios.post(`${serverUrl}/api/auth/verify-otp`,{email, otp},
        {withCredentials: true}
      )
      console.log("verify result", result)
      setError("")
      setStep(3)
      setLoading(false)

    } catch (error) {
      setError(error?.response?.data?.message)
      setLoading(false)
    }
  }

  const handleResetPass = async() => {
    if(newPassword != confirmPassword){
      return null
    }
    setLoading(true)
    try {
      const result = await axios.post(`${serverUrl}/api/auth/reset-password`, {email, newPassword},
        {withCredentials: true}
      )
      console.log("Reset pass result", result)
      setError("")
      navigate('/signin')
      setLoading(false)
    } catch (error) {
      setError(error?.response?.data?.message)
      setLoading(false)
    }
  }


  return (
    <div className="w-full min-h-screen p-4 flex items-center justify-center bg-[#fff9f6]">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 ">
        <div className="flex items-center gap-4 mb-4">
          <IoIosArrowRoundBack
            size={30}
            className="text-[#ff4d2d] cursor-pointer"
            onClick={() => navigate("/signin")}
          />
          <h1 className="text-2xl font-bold text-center text-[#ff4d2d]">
            Forgot Password
          </h1>
        </div>

{/* {Step 1 1 1 1 1 1 1 } */}

        {step == 1 && (
          <div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                email
              </label>
              <input
                text="email"
                placeholder="enter your email"
                className="w-full focus:outline-none border rounded-lg px-3 py-2"
                style={{
                  border: `1px solid ${borderColor}`,
                }}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <button
              className={`w-full font-semibold py-2  gap-2 border rounded-lg transition duration-200
       bg-[#ff4d2d] text-white  hover:bg-[#e64323] cursor-pointer `} onClick={handleSendOtp} disabled={loading}
            >
              {loading?<ClipLoader size={20} color="white"/>:"Send Otp"}
            </button>

            {error && <p className="text-red-500 text-center">*{error}</p>}

          </div>
        )}

 {/* {Step 2 2 2 2 2 2 2 2 2 2} */}

        {step == 2 && (
          <div>
            <div className="mb-4">
              <label
                htmlFor="otp"
                className="block text-gray-700 font-medium mb-1"
              >
                Enter OTP
              </label>
              <input
                text="number"
                placeholder="Enter Otp"
                className="w-full focus:outline-none border rounded-lg px-3 py-2"
                style={{
                  border: `1px solid ${borderColor}`,
                }}
                onChange={(e)=> setOtp(e.target.value)}
                value={otp}
                required
              />
            </div>

            <button className="w-full font-semibold py-2  gap-2 border rounded-lg transition duration-200
       bg-[#ff4d2d] text-white  hover:bg-[#e64323] cursor-pointer " onClick={handleVerifyOtp} disabled={loading}>
             {loading?<ClipLoader size={20} color="white"/>:"Verify Otp"}
            </button>

            {error && <p className="text-red-500 text-center">*{error}</p>}

          </div>
        )}

 {/* {Step 3 3 3 3 3 3 3 3} */}

         {step==3 &&
      <div>
        <div className="mb-4">
            <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-1">New Password</label>
            <input 
             type="text"
             placeholder="New Password"
              className="w-full focus:outline-none border rounded-lg px-3 py-2"
                style={{
                  border: `1px solid ${borderColor}`,
                }}
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                required
             />
        </div>

        <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-1">Confirm Password</label>
            <input 
             type="text"
             placeholder="Confirm Password"
             className="w-full focus:outline-none border rounded-lg px-3 py-2"
                style={{
                  border: `1px solid ${borderColor}`,
                }}
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                required
             />
        </div>

        <button
              className={`w-full font-semibold py-2  gap-2 border rounded-lg transition duration-200
       bg-[#ff4d2d] text-white  hover:bg-[#e64323] cursor-pointer `} onClick={handleResetPass}
       disabled={loading}
            >
              {loading?<ClipLoader size={20} color="white"/>:"Reset Password"}
            </button>

           {error && <p className="text-red-500 text-center">*{error}</p>}

      </div>}
      </div>

     
    </div>
  );
}

export default ForgotPassword;
