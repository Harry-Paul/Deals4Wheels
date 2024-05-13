import React from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleOneTapLogin } from '@react-oauth/google';
import {jwtDecode} from "jwt-decode"
import axios from "../api/axios"
import useAuth from "../hooks/useAuth";

const Googlelogin = () => {

  const { setAuth } = useAuth();
  const { auth } = useAuth();
  const accessToken = auth?.accessToken;

  return (
    <div id="signInButton">
        <GoogleLogin
          onSuccess={credentialResponse => {
            console.log(jwtDecode(credentialResponse?.credential));
            const email=jwtDecode(credentialResponse?.credential).email
            axios.post('/auth/googlesignin',{email},
              {
                headers: {
                  'Authorization': `Bearer ${accessToken}`
                },
                withCredentials: true
              }
            )
            .then(result=>{
              console.log(result)
              const accessToken=result.data.accessToken;
              const password=""
              setAuth({email,password,accessToken})
            })
            .catch(err=>{
              console.log(err)
            })
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />;
    </div>
  )
}

export default Googlelogin