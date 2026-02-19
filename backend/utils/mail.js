import  nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

console.log(process.env.EMAIL, process.env.PASS ? "Password loaded" : "Password missing")
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASS,
    }
});

transporter.verify((error, success) => {
  if (error) console.error(error);
  else console.log("SMTP connection successful!");
});

export const sendOtpMail = async(to, otp)=> {
    await transporter.sendMail({
        from: process.env.EMAIL,
        to,
        subject: "Reset Your Password",
        html: `<p> Your otp for password reset is <b>${otp}</b>. It expires in 5 minutes.</p> `
    })
}