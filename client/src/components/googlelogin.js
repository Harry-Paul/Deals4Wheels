import React from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleOneTapLogin } from '@react-oauth/google';
import {jwtDecode} from "jwt-decode"
import axios from "../api/axios"
import useAuth from "../hooks/useAuth";
import { useNavigate } from 'react-router-dom';

const Googlelogin = () => {

  const { setAuth } = useAuth();
  const { auth } = useAuth();
  const accessToken = auth?.accessToken;
  const navigate=useNavigate()

  return (
    <div id="signInButton">
        <GoogleLogin
          onSuccess={credentialResponse => {
            console.log(jwtDecode(credentialResponse?.credential));
            const email=jwtDecode(credentialResponse?.credential).email
            const pic=jwtDecode(credentialResponse?.credential).picture
            axios.post('/auth/googlesignin',{email,pic},
            {
              headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
              withCredentials: true
            }
            )
            .then(result=>{
              console.log(result)
              const accessToken=result.data.accessToken;
              const password=""
              setAuth({email,accessToken,pic})
              navigate("/")
            })
            .catch(err=>{
              console.log(err)
            })
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
    </div>
  )
}

export default Googlelogin