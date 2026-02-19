import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import genToken from "../utils/token.js"
import { sendOtpMail } from "../utils/mail.js"

export const signUp = async(req, res)=>{
    try {
        const {fullName, email, password, mobile, role} = req.body
        let user = await User.findOne({email})
        // if(!fullName){
        //     return res.status(400).json({message: "Name is required"})
        // }
        // if(!email){
        //     return res.status(400).json({message: "Invalid email"})
        // }
        if(user){
            return res.status(400).json({message: "User Already Exixt.."})
        }
        if(password.length < 8){
            return res.status(400).json({message: "Password must be at least 8 character"})
        }
        if(mobile.length < 10){
            return res.status(400).json({message: "mobile number digit at least 10 digit."})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        user = await User.create({
            fullName,
            email,
            role,
            mobile,
            password: hashedPassword
        })

        const token = await genToken(user._id)
        res.cookie("token", token,{
            secure: false,
            sameSite: "strict",
            maxAge: 7*24*60*60*1000,
            httpOnly: true
        })


        return res.status(201).json(user)


    } catch (error) {
        return res.status(500).json({message:`sign up error ${error}`})
    }
}

export const signIn = async(req, res)=> {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        if (!user) {
         return res.status(404).json({ message: "User not found" });
    }
        
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message: "Incorrect Password."})
        }

        const token = await genToken(user._id)
        res.cookie("token", token,{
            secure: false,
            sameSite: false,
            maxAge: 7*24*60*60*1000,
            httpOnly: true
        })

        return res.status(200).json({message: "Sign in Successiful"})
    } catch (error) {
        return res.status(500).json(`Sign In error ${error}`)
    }
}

export const signOut = async(req, res)=>{
    try{
        res.clearCookie("token")
        return res.status(200).json({message: "log out Successifully"})
    }catch(error){
        res.status(500).json({message: `Sign out error ${error}`})
    }
}

// { FOrgot password }


export const sendOtp = async(req,res) => {
    try {
        const {email} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message: "User deoe not exist.."})
        }
        const otp = Math.floor(1000 + Math.random() * 9000).toString()
        console.log(otp)
        user.resetOtp = otp
        user.otpExpires = Date.now() + 5*60*1000
        user.isOtpVerify = false
        await user.save()
        await sendOtpMail(email, otp)
        return res.status(200).json({message: "Otp sent successifully"})

    } catch (error) {
        return res.status(400).json({message:`otp error ${error}`})
    }
}


export const verifyOtp = async(req, res) => {
    try {
        const {email,otp} = req.body
        const user = await User.findOne({email})
        if(!user || user.resetOtp!= otp || user.otpExpires < Date.now()){
            return res.status(400).json({message: "Invalid/Expired otp"})
        }
        user.isOtpVerify = true
        user.resetOtp = undefined
        user.otpExpires = undefined
        await user.save()
        return res.status(200).json({message: 'Otp verify Successifully'})

    } catch (error) {
      return res.status(500).json({message: `verify Otp Error ${error}`})  
    }
}


export const resetPassword = async(req, res)=>{
    try {
        const {email, newPassword} = req.body
        const user = await User.findOne({email})
        if(!user || !user.isOtpVerify){
            return res.status(400).json({message: "Otp verification required"})
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedPassword
        user.isOtpVerify = false
        await user.save()
        return res.status(200).json({message: "Password reset successifully"})
    } catch (error) {
        return res.status(500).json({message: `Reset password Error ${error}`})
    }
}


export const googleAuth = async(req, res)=>{
    try {
        const {fullName, email, mobile,role} = req.body
        let user = await User.findOne({email})
        if(!user){
            user = await User.create({
                fullName, email, mobile,role
            })
        }

        const token = await genToken(user._id)
        res.cookie("token", token,{
            secure: false,
            sameSite: 'strict',
            maxAge: 7*24*60*60*1000,
            httpOnly: true
        })

        return res.status(200).json(user)


    } catch (error) {
        return res.status(500).json({message:`google auth error ${error}`})
    }
}