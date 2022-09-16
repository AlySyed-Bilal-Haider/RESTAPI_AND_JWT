import "./App.css";
import { AppBar, TextField, Button, Box } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Editevalue({ check, value,func,fetchfunc }) {
  console.log("value",value);
  const [Infostate, setInfostate] = useState({
    goal:value.goal,
    goaldes:value.goaldes,
    category:value.category,
    attribute:value.attribute,
    goalstage:value.goalstage,
    jobregion:value.jobregion,
  });
  const url = "http://localhost:4000";
  const [open, setOpen] = useState(check || false);
  const handleClose = () => {
    setOpen(false);
    func();
    fetchfunc();
  };
  // ......get input value one by one.......
  const formHandle = (event) => {
    setInfostate({ ...Infostate, [event.target.name]: event.target.value });
  };
  //  ........ post data on server side...........
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`${url}/editeid/${value._id}`, Infostate);
      toast.success("Update successfully");
    } catch (error) {
      console.log("error", error);
      toast.error(error);
    }
    setInfostate({
      goal: "",
      goaldes: "",
      category: "",
      attribute: "",
      goalstage: "",
      jobregion: "",
    });
    // handleClose();
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="App">
            <AppBar>
              <h2>Goal Form </h2>
            </AppBar>

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
                  sx={{ width: "100%", margin: "5px" }}
                  type="text"
                  label="setgoal"
                  variant="outlined"
                  onChange={formHandle}
                />
                <br />
                <TextField
                  sx={{ width: "100%", margin: "5px" }}
                  type="text"
                  value={Infostate.goaldes}
                  name="goaldes"
                  label="goal description"
                  variant="outlined"
                  onChange={formHandle}
                />
                <br />
                <TextField
                  sx={{ width: "100%", margin: "5px" }}
                  type="text"
                  name="category"
                  value={Infostate.category}
                  label="Diversity catagory"
                  variant="outlined"
                  onChange={formHandle}
                />
                <br />
                <TextField
                  sx={{ width: "100%", margin: "5px" }}
                  type="text"
                  label="Attribute"
                  value={Infostate.attribute}
                  variant="outlined"
                  name="attribute"
                  onChange={formHandle}
                />
                <br />
                <TextField
                  sx={{ width: "100%", margin: "5px" }}
                  type="text"
                  label="goal stage"
                  variant="outlined"
                  name="goalstage"
                  value={Infostate.goalstage}
                  onChange={formHandle}
                />
                <br />
                <TextField
                  sx={{ width: "100%", margin: "5px" }}
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
                  sx={{ width: "100%" }}
                >
                  save
                </Button>
              </form>
            </Box>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
