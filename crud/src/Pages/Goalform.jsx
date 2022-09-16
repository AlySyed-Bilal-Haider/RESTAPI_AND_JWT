import "./App.css";
import { AppBar, TextField, Button, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Editevalue from "./Update";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate} from 'react-router-dom';
import jwt from "jsonwebtoken";
import axios from "axios";
export default function GoalForm() {
  const navigate=useNavigate();
  const [userrecord, setuserState] = useState([]);
  const [setUniquevalue, setUniquestate] = useState("");
  const [checkvalue, setcheckstate] = useState(false);
  const [Infostate, setInfostate] = useState({
    goal: "",
    goaldes: "",
    category: "",
    attribute: "",
    goalstage: "",
    jobregion: "",
  });
  // .......get all goal informations from server.........
  const url = "http://localhost:4000";
  async function fetchdata() {
    try {
      const { data } = await axios.get(url);
      console.log("data", data);
      setuserState(data);
    } catch (error) {
      console.log("error", error);
      toast.error(error);
    }
  }
  const populateQoute = async () => {
    try{
      const req = await fetch(`${url}/verifytoken`, {
        method:'post',
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      const data = req.json(req);
      console.log("data check token verify:",data)
      if(data.status=='error'){
        navigate('/login');
      }
    }catch(error){
      alert(error);
    }
  
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/");
      } else {
        populateQoute();
      }
    }
    fetchdata();
  }, []);
  // .......remove one record from backend.......
  const removeHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${url}/remove/${id}`);
      toast.success("User goal remove successfull !");
      (await data) && fetchdata();
    } catch (error) {
      console.log("error", error);
      toast.error(error);
    }
  };
  // ......get input value one by one.......
  const formHandle = (event) => {
    setInfostate({ ...Infostate, [event.target.name]: event.target.value });
  };
  //  ........ post data on server side...........
  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log("Infostate", Infostate);
    try {
      const { data } = await axios.post(`${url}/postvalue`, Infostate);
      console.log("data");
      toast.success(data.message);
    } catch (error) {
      console.log("error", error);
    }
    setInfostate({
      goal: "",
      goaldes: "",
      category: "",
      attribute: "",
      goalstage: "",
      jobregion: "",
    });
  };

  // get date according to id, then send update Component, update date with the help of ID
  const editeHandler = async (id) => {
    console.log("id", id);
    try {
      axios.get(`${url}/getid/${id}`).then((res) => {
        setcheckstate(true);
        setUniquestate(res.data);
      });
      // console.log("data edite:",data);
    } catch (error) {
      console.log("error", error);
      toast.error(error);
    }
  };
  // .........Modal handler open and close...............
  const modalHandler = () => {
    console.log("modaler");
    setcheckstate(false);
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="App">
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
          <form onSubmit={submitHandler} style={{ width: "90%" }}>
            <TextField
              name="goal"
              value={Infostate.goal}
              sx={{ width: { md: "50%", xs: "95%" }, margin: "5px" }}
              type="text"
              label="setgoal"
              variant="outlined"
              onChange={formHandle}
            />
            <br />
            <TextField
              sx={{ width: { md: "50%", xs: "95%" }, margin: "5px" }}
              type="text"
              value={Infostate.goaldes}
              name="goaldes"
              label="goal description"
              variant="outlined"
              onChange={formHandle}
            />
            <br />
            <TextField
              sx={{ width: { md: "50%", xs: "95%" }, margin: "5px" }}
              type="text"
              name="category"
              value={Infostate.category}
              label="Diversity catagory"
              variant="outlined"
              onChange={formHandle}
            />
            <br />
            <TextField
              sx={{ width: { md: "50%", xs: "95%" }, margin: "5px" }}
              type="text"
              label="Attribute"
              value={Infostate.attribute}
              variant="outlined"
              name="attribute"
              onChange={formHandle}
            />
            <br />
            <TextField
              sx={{ width: { md: "50%", xs: "95%" }, margin: "5px" }}
              type="text"
              label="goal stage"
              variant="outlined"
              name="goalstage"
              value={Infostate.goalstage}
              onChange={formHandle}
            />
            <br />
            <TextField
              sx={{ width: { md: "50%", xs: "95%" }, margin: "5px" }}
              type="text"
              label="job region"
              variant="outlined"
              name="jobregion"
              value={Infostate.jobregion}
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
                <th>Goal</th>
                <th>Goal Descriptions</th>
                <th>Goal stage</th>
                <th>category</th>
                <th>Delete</th>
                <th>Edite</th>
              </tr>

              {userrecord?.map(
                ({ goal, goaldes, goalstage, category, _id }) => {
                  return (
                    <tr key={_id}>
                      <td>{goal}</td>
                      <td>{goaldes}</td>
                      <td>{goalstage}</td>
                      <td>{category}</td>
                      <td
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          removeHandler(_id);
                        }}
                      >
                        <DeleteIcon />
                      </td>
                      <td
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          editeHandler(_id);
                        }}
                      >
                        <EditIcon />
                      </td>
                    </tr>
                  );
                }
              )}
            </table>}
           
          </Box>
        </Box>
      </div>
      {checkvalue && (
        <Editevalue
          check={checkvalue}
          value={setUniquevalue}
          func={modalHandler}
          fetchfunc={fetchdata}
        />
      )}
    </>
  );
}
