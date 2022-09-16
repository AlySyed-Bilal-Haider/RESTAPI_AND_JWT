import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function Signup() {
  const navigate=useNavigate();
  const [userrecord,setuserState]=useState([]);
  const matches = useMediaQuery('(max-width:700px)');
  const url = "http://localhost:4000";
  const [Infostate, setInfostate] = useState({
    fname: "",
    email: "",
    password:"",
  });

  // .........fetch registers user from server,.........
  useEffect(()=>{
    fetchdata();
  },[]);
  async function fetchdata() {
    try {
      const { data } = await axios.get(`${url}/getuser`);
      console.log("data", data);
      setuserState(data);
    } catch (error) {
      console.log("error", error);
      toast.error(error);
    }
  }

  // ......get input value one by one.......
  const formHandle = (event) => {
    setInfostate({ ...Infostate, [event.target.name]: event.target.value });
  };
  //  ........ post data on server side...........
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Infostate", Infostate);
    try {
      const { data } = await axios.post(`${url}/usersignup`, Infostate);
      console.log("data");
     if(data.status=='ok')
     {
      alert("User register successfully");
      navigate("/Login");
     }
    } catch (error) {
      console.log("error", error);
      alert(error);
    }
    setInfostate({
      fname: "",
      email: "",
      password:"",
    });
  };
  return (
    <Box
    sx={{
      width: "100%",
      py: 2,
      mt: 8,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: { md: "row", xs: "column" },
    }}
    >
      <form onSubmit={submitHandler} style={{width:'90%',padding:"5px 0px 5px 0px",display:'flex',justifyContent:"center",alignItems:'center',
    flexDirection:"column"}}>
        <TextField
          name="fname"
          value={Infostate.fname}
          sx={{ width: { md: "50%", xs: "95%" }}}
          type="text"
          label="first name"
          variant="outlined"
          onChange={formHandle}
        />
        <br />
       
        <TextField
          sx={{ width: { md: "50%", xs: "95%" } }}
          type="email"
          name="email"
          value={Infostate.email}
          label="Email"
          variant="outlined"
          onChange={formHandle}
        />
        <br />
        <TextField
         sx={{ width: { md: "50%", xs: "95%" } }}
          type="password"
          value={Infostate.password}
          name="password"
          label="password"
          variant="outlined"
          onChange={formHandle}
        />
        <br />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ width: { md: "50%", xs: "95%" } }}
        >
          save
        </Button>
      </form>
      <Box
            sx={{
              width: "100%",
              mt: { md: 0, xs: 3 },
              mr: { md: 3, xs: 0 },
              ml: { md: 0, xs: 3 },
            }}
          >
            {userrecord &&  <table id="customers">
              <tr>
                <th>first name</th>
                <th>Email</th>
                <th>Goal stage</th>
                <th>category</th>
               
              </tr>

              {userrecord?.map(
                ({ fname,email,_id}) => {
                  return (
                    <tr key={_id}>
                      <td>{fname}</td>
                      <td>{email}</td> 
                    </tr>
                  );
                }
              )}
            </table>}
           
          </Box>
    </Box>
  );
}

export default Signup;
