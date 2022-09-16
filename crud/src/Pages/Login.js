import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate=useNavigate();
  const matches = useMediaQuery('(max-width:700px)');
  const url = "http://localhost:4000";
  const [Infostate, setInfostate] = useState({
    email: "",
    password:""
  });
  // ......get input value one by one.......
  const formHandle = (event) => {
    setInfostate({ ...Infostate, [event.target.name]: event.target.value });
  };


  //  ........ post data on server side...........
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${url}/login`, Infostate);
      console.log("loging data",data);
      if(data.user){
        localStorage.setItem("token",data.user);
        alert("Login success full");
        navigate("/");
      }else{
        alert("Please check your password and email");
      }
    } catch (error) {
      console.log("error", error);
    }
    setInfostate({
      email: "",
      password:""
    });
  };



  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
       mt:12

      }}
    >
      <form onSubmit={submitHandler} style={{width:matches?'90%':'40%'}}>
      <TextField
          sx={{ width: { md: "98%", xs: "95%" }, margin: "5px" }}
          type="email"
          name="email"
          value={Infostate.email}
          label="Email"
          variant="outlined"
          onChange={formHandle}
        /><br/>
        <TextField
          name="password"
          value={Infostate.password}
          sx={{ width: { md: "98%", xs: "95%" }, margin: "5px" }}
          type="password"
          label="password"
          variant="outlined"
          onChange={formHandle}
        />
        <br />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ width: { md: "98%", xs: "95%",ml:{md:4,xs:1} } }}
        >
          save
        </Button>
      </form>
    </Box>
  );
}

export default Login;
