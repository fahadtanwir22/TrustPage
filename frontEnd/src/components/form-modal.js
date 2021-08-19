import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import "./form-modal.css";
import { InputLabel, Input, FormGroup } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: "10px",
  },
  btn: {
    width: "180px",
    height: "40px",
    textAlign: "center",
    background: "#3f50b5",
    border: "none",
    borderRadius: "5px",
    color: "white",
  },
  btnModal: {
    marginTop: "10px",
  },
  error: {
    color: "red",
  },
}));

export default function TransitionsModal({ setRender }) {
  const classes = useStyles();
  const [state, setState] = useState({
    name: "",
    purpose: "",
    location: "",
  });
  const [error, setError] = useState();
  const [open, setOpen] = React.useState(false);

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError();
  };

  const handleSubmit = async (e) => {
    setRender(false);
    e.preventDefault();
    let alphaExp = /^[a-zA-Z]+$/;

    if (
      state.name.match(alphaExp) &&
      state.purpose.match(alphaExp) &&
      state.location.match(alphaExp)
    ) {
      await axios({
        method: "post",
        url: "http://localhost:4000/subprocessor",
        data: state,
      });
      setOpen(false);
      setRender(true);
      setError();
    } else {
      setError("Please enter only alphabets");
    }

    if (
      state.name.length === 0 ||
      state.purpose.length === 0 ||
      state.location.length === 0
    ) {
      setError("All fields required");
    }
  };

  return (
    <div>
      <button className={classes.btn} type="button" onClick={handleOpen}>
        Add Subprocessor
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Add Subprocessor</h2>
            <FormGroup>
              <h4 className={classes.error}>{error}</h4>
              <FormControl>
                <InputLabel htmlFor="my-input">Name</InputLabel>
                <Input
                  id="my-input"
                  type="text"
                  name="name"
                  aria-describedby="my-helper-text"
                  onChange={handleChange}
                  autoComplete="off"
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="my-input">Purpose</InputLabel>
                <Input
                  id="my-input"
                  type="text"
                  name="purpose"
                  aria-describedby="my-helper-text"
                  onChange={handleChange}
                  autoComplete="on"
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="my-input">Location</InputLabel>
                <Input
                  id="my-input"
                  type="text"
                  name="location"
                  aria-describedby="my-helper-text"
                  onChange={handleChange}
                  autoComplete="off"
                />
              </FormControl>

              <FormControl>
                <Button
                  className={classes.btnModal}
                  onClick={handleSubmit}
                  variant="contained"
                  color="primary"
                >
                  Add
                </Button>
              </FormControl>
            </FormGroup>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
