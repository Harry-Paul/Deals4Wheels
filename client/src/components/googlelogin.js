import React from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleOneTapLogin } from '@react-oauth/google';
import {jwtDecode} from "jwt-decode"
const clientId = "655250501376-mmju2bhl7afe9ljf9c0n6s8gee5kk9ek.apps.googleusercontent.com"

const Googlelogin = () => {

  return (
    <div id="signInButton">
        <GoogleLogin
          onSuccess={credentialResponse => {
            console.log(jwtDecode(credentialResponse?.credential));
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />;
    </div>
  )
}

export default Googlelogin