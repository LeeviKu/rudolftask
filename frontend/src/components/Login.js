import React, { useState } from 'react'
import axios from 'axios'
import "../Login.css"
import { TextField, InputAdornment, IconButton } from "@material-ui/core"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

async function loginUser(credentials) {
   return axios.post('http://localhost:8080/login', {
       username: credentials.username,
       password: credentials.password
   }).then(result => result.data)
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token.accessToken);
  }

    return(
    <div className="wrapper">
      <div className="login-left">
        <img src="login_img.svg" alt="login img" className="login-img"></img>
      </div>
      <div className="login-wrapper">
        <h1 className="logo">The Rudolf</h1>
        <h3 className="sign">Sign-in!</h3>
        <form onSubmit={handleSubmit} className="form">
          <lable>
            <Box width={380} mb={3}>
            <TextField InputLabelProps={{
                style: {color: "#C6C6C6",
                fontSize: 18
              }
              }} fullWidth="true" className="loginField" label="EMAIL" variant="outlined" onChange={e => setUserName(e.target.value)}></TextField>
            </Box>
          </lable>
          <lable>
            <Box width={380} mb={3} pb={8}>
              <TextField 
                InputLabelProps={{
                  style: {color: "#C6C6C6",
                  fontSize: 18
                  }
                }}
                InputProps={{
                  endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}>
                      {showPassword ? <Visibility style={{fontSize: "22px"}} /> : <VisibilityOff style={{fontSize: "22px"}}/>}
                    </IconButton>
                  </InputAdornment>
                  )
                }} fullWidth="true" type={showPassword ? "text" : "password"} label="PASSWORD" variant="outlined" onChange={e => setPassword(e.target.value)}>
              </TextField>
            </Box>
          </lable>
          <Button style={{
            backgroundColor: "#444D63",
            color: "#F2F2F2",
            borderRadius: 9,
            fontSize: 18
          }} size="large" variant="contained" type="submit">NEXT
          </Button>
        </form>
      </div>
    </div>
    )
}