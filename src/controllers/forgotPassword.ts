import nodemailer from 'nodemailer'
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModels';
import { JWT } from '../config/db';
import bcrypt from 'bcrypt'
export const forgot_pass =  async (req: Request, res: Response) => {
  const { to, subject, text, email} = req.body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email, 
      pass: process.env.GOOGLE_APP_PASS, 
    },
  });
  const token = jwt.sign({ to}, JWT, { expiresIn: "15m" });
  const reset_link = `http://localhost:3002/reset_pass/${token}`
  try {
    const info = await transporter.sendMail({
      from: `"My App" <${email}>`,
      to,
      subject, 
      text,
      reset_link

    });
    console.log('link',reset_link)

    res.json({ success: true, message: "Email sent!", info, token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to send email", error });
  }
}

export const reset_pass = async (req, res) => {
  const { token } = req.params;
  const { newPassword, email } = req.body;

  try {
    const decoded = jwt.verify(token, JWT) as jwt.JwtPayload;
    console.log("Decoded Token:", decoded); 

    const user = await User.findOne({ email });
    console.log('user', user.email)

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (decoded.to !== user.email) {  
      return res.status(400).json({ message: "Invalid token or email mismatch" });
    }

    // Hash the new password
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save(); 

    res.json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(400).json({ success: false, message: "Invalid or expired token" });
  }
};
