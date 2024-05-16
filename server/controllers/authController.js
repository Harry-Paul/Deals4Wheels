const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const User = require('../model/user');
const jwt = require("jsonwebtoken");

const signin = async (req,res) => {
    const{email,password}=req.body;
    User.findOne({email: email})
    .then(user =>{
        console.log(user)
        if(user && user.password===password){
            if(user.password===password){
                console.log(process.env.ACCESS_TOKEN_SECRET)
                const accessToken = jwt.sign(
                    {
                        "UserInfo": {
                            "username": user.email,
                            "type": user.signintype
                        }
                    },
                    `${process.env.ACCESS_TOKEN_SECRET}`,
                    {expiresIn: "500s"}
                );
                const rToken = jwt.sign(
                    {id: user.email},
                    `${process.env.REFRESH_TOKEN_SECRET}`,
                    {expiresIn: "1d"}
                );

                res.cookie('jwt', rToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'None',
                    maxAge: 7*24*60*1000
                })
                run();
                async function run(){
                    await user.updateOne({refreshToken:rToken})
                }
                console.log("log in Success")
                return res.json({"auth": true, "token": accessToken});
            }
            else{
                return res.json({"auth": false});
            }
        }
        else{
            return res.json({"auth": false});
        }
    })
}

const refresh = (req, res) => {
    const cookies = req.cookies
    console.log(cookies)
    if(!cookies?.jwt) return res.status(401).json({message: 'Unauthorized'})

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if(err) return res.status(403).json({message: 'Forbidden'})

            const foundUser = await User.findOne({email: decoded.id}).exec()

            if(!foundUser) return res.status(401).json({ message: 'Unauthorized' })

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": foundUser.email,
                        "type": foundUser.signintype
                    }
                },
                `${process.env.ACCESS_TOKEN_SECRET}`,
                {expiresIn: "500s"}
            );
            const email=foundUser.email
            const password=foundUser.password
            console.log("refresh success")
            res.json({accessToken,email,password})
        }
    )
}

const logout = async (req, res) => {
    // console.log(req)
    const cookies = req.cookies;
    console.log("fgh")
    console.log(cookies)
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    // Delete refreshToken in db
    // foundUser.refreshToken = foundUser.refreshToken.filter(rt => rt !== refreshToken);;
    // const result = await foundUser.save();
    // console.log(result);
    await User.updateOne({refreshToken:refreshToken},{refreshToken:""})


    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
}

const signup=async(req,res)=>{
    const{email,password}=req.body;
    console.log(req.body)
    User.findOne({email: email})
    .then(user =>{
        if(user){
            res.json("Already exist")
        }
        else{
            User.create(req.body)
            res.json("Signed up")
        }
    })
    .catch(err=>{
        console.log(err)
    })
    
}

const googlesignin=async(req,res)=>{
    const{email}=req.body;
    console.log(email)
    start();
    function start(){
        User.findOne({email:email})
    .then(user=>{
        if(!user){
            User.create({email:email,password:"abc",signintype:"google"})
            start();
        }
        else{
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": email,
                        "type": "google"
                    }
                },
                `${process.env.ACCESS_TOKEN_SECRET}`,
                {expiresIn: "500s"}
            );
            const rToken = jwt.sign(
                {id: email},
                `${process.env.REFRESH_TOKEN_SECRET}`,
                {expiresIn: "1d"}
            );
    
            res.cookie('jwt', rToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: 7*24*60*1000
            })
    
                run();
                    async function run(){
                        await User.updateOne({email:email},{refreshToken:rToken})
                    }
            return res.json({"auth": true, "token": accessToken});
        }
        
    })
    }
    
}

module.exports = {signin, refresh, logout,signup, googlesignin};