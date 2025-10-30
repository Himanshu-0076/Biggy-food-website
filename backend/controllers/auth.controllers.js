import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import genToken from "../utils/token.js"

export const signUp = async(req, res)=>{
    try {
        const {fullName, email, password, mobile, role} = req.body
        const user = await User.findOne({email})
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
        return res.status(500).json(`sign up error ${error}`)
    }
}

export const signIn = async(req, res)=> {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        if(!user){
            res.status(400).json({message: "User Does noit exist"})
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

        return res.status(200).json(user)
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