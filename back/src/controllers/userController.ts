import {prisma} from '../db';
import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function registeruser(req:Request,res:Response){
    try{
        const {name,email,password}=req.body;
        //checking if user exists in db 
        const existingUser=await prisma.user.findUnique({
            where:{email}
        });
        if(existingUser){
            return res.status(400).json({message:'User already exists'});
        }
        //hasing the password;
        const hashedPassword=await bcrypt.hash(password,10);
        // creating the new user in db
        const newUser=await prisma.user.create({
            data:{
                name,
                email,
                password:hashedPassword
            }
        })
        // creating a jwt token
        const token=jwt.sign({
            userId:newUser.id,
            email:newUser.email
        },'your_jwt_secret',{
            expiresIn:'1h'
        })

        //sedding response back
        return res.status(201).json({
            message:'User registered successfully',
            user:{
                id:newUser.id,
                name:newUser.name,
                email:newUser.email
            },
            token
        })  
    }
    catch(error){
        console.error('Error registering user:',error);
        return res.status(500).json({message:'Internal server error'});
    }
}
async function loginuser(req:Request,res:Response){
    try{
        const {email,password}=req.body;
        //checking if user exists in db 
        const existingUser=await prisma.user.findUnique({
            where:{email}
        });
        if(!existingUser){
            return res.status(400).json({message:'Invalid email or password'});
        }
        //comparing the password
        const isPasswordValid=await bcrypt.compare(password,existingUser.password);
        if(!isPasswordValid){
            return res.status(400).json({message:'Invalid email or password'});
        }
        // creating a jwt token
        const token=jwt.sign({
            userId:existingUser.id,
            email:existingUser.email
        },'your_jwt_secret',{
            expiresIn:'1h'
        })

        //sedding response back
        return res.status(200).json({
            message:'User logged in successfully',
            user:{
                id:existingUser.id,
                name:existingUser.name,
                email:existingUser.email
            },
            token
        })  
    }
    catch(error){
        console.error('Error logging in user:',error);
        return res.status(500).json({message:'Internal server error'});
    }
}
export {registeruser,loginuser};