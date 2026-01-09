import db from "../configs/db.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


//signup api
export const signup=async(req,res)=>{
    try {
        const {username,email,password}=req.body;

        if(!username || !email || ! password){
            return res.status(400).json({
                message:"All fields are required"
            })
        }
        //check if user already exists
        const existingUser=await db.query("SELECT id FROM users WHERE email=$1",[email]);

        if (existingUser.rows.length > 0) {
            return res.status(409).json({
                message: "User already exists",
            });
        }

        //we hash password
        const hashedPassword=await bcrypt.hash(password,10);

        //insert user
        const newUser=await db.query("INSERT INTO users (username,email,password) VALUES ($1,$2,$3) RETURNING id,username,password",[username,email,hashedPassword]);
        res.status(201).json({
            message:'User registered successfully',
            user:newUser.rows[0],
        })

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({
        message: "Internal server error",
        });
    }
}

//login api
export const login=async (req,res)=>{
try {
    const {email,password}=req.body

    if (!email||!password){
        return res.status(400).json({
            message:'Email and password are required'
        })
    }

    //find user by email
    const result=await db.query("SELECT id,email,username,password FROM users WHERE email=$1",[email])

    if (result.rows.length===0){
        return res.status(401).json({
            message:'Invalid credentials'
        })
    }

    const user=result.rows[0]

    //compare passwords
    const isMatch=await bcrypt.compare(password,user.password)

    if (!isMatch){
        return res.status(401).json({
            message:'Invalid credentials'
        })
    }

    //create jwt
    const token=jwt.sign(
        {userId:user.id},
        process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRES_IN}
    )

    //set http only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, 
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });



} catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
}
}

//me endpint api
export const me=async(req,res)=>{
    try {
        const userId=req.userId;        ///use userID from middleware

        const result=await db.query("SELECT id,username,email FROM users WHERE id=$1",[userId])

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ user: result.rows[0] });



    } catch (error) {
        console.error("/me error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//logout api
export const  logout=(req,res)=>{
    res.clearCookie("token",{
        httpOnly:true,
        sameSite:"strict",
        secure:false,
    })

    res.json({message:"Logged out succesfully"})
}
