import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
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
    width: "150px",
    height: "30px",
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

export default function TransitionsModal({ process, setRender }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [error, setError] = useState();
  const [state, setState] = useState({
    name: process.name || "",
    purpose: process.purpose || "",
    location: process.location || "",
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError();
  };

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    const id = process.id;
    setRender(false);

    let alphaExp = /^[a-zA-Z]+$/;
    if (
      state.name.match(alphaExp) &&
      state.purpose.match(alphaExp) &&
      state.location.match(alphaExp)
    ) {
      await axios({
        method: "patch",
        url: `http://localhost:4000/subprocessor/${id}`,
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
      <EditIcon onClick={handleOpen} />

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
            <h2 id="transition-modal-title">Edit</h2>
            <h4 className={classes.error}>{error}</h4>
            <FormGroup>
              <FormControl>
                <InputLabel htmlFor="my-input">Name</InputLabel>
                <Input
                  id="my-input"
                  type="text"
                  name="name"
                  value={state.name}
                  aria-describedby="my-helper-text"
                  autoComplete="off"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="my-input">Purpose</InputLabel>
                <Input
                  id="my-input"
                  type="text"
                  name="purpose"
                  value={state.purpose}
                  aria-describedby="my-helper-text"
                  autoComplete="on"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="my-input">Location</InputLabel>
                <Input
                  id="my-input"
                  type="text"
                  name="location"
                  value={state.location}
                  aria-describedby="my-helper-text"
                  autoComplete="off"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <Button
                  className={classes.btnModal}
                  onClick={handleUpdate}
                  variant="contained"
                  color="primary"
                >
                  Update
                </Button>
              </FormControl>
            </FormGroup>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
