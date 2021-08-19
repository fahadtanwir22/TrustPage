import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import TransitionsModal from "../components/edit-modal";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import AddFormModal from "./form-modal";
import "./table.css";
import { Typography, Box, Grid, Container } from "@material-ui/core";

const useStyles = makeStyles({
  addModal: {
    textAlign: "end",
  },
});

export default function AcccessibleTable() {
  const classes = useStyles();
  const [processors, setProcessors] = useState("");
  const [open, setOpen] = React.useState(false);
  const [render, setRender] = React.useState(false);
  const [id, setId] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:4000/subprocessor")
      .then((res) => setProcessors(res.data.data));
  }, [render]);

  const handleOpen = (process) => {
    setOpen(true);
    setId(process.id);
  };
  const handleDelete = (process) => {
    setRender(false);
    axios.delete(`http://localhost:4000/subprocessor/${id}`).then((res) => {
      console.log(res);
      setProcessors(res.data.data);
      res.status === 200 && setOpen(false);
      setRender(true);
    });
  };
  const handleClose = () => {
    setOpen(false);
    setId();
  };

  const handleSubmit = () => {
    handleDelete();
    setOpen(false);
  };
  return (
    <>
      <Container>
        <Box className={classes.mainBox}>
          <Grid container>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Typography variant="h5" color="inherit" align="left">
                Subprocessors
              </Typography>
            </Grid>
            <Grid
              className={classes.addModal}
              item
              xs={6}
              sm={6}
              md={6}
              lg={6}
            >
              <AddFormModal setRender={setRender} />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="caption table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <b>Name</b>
                      </TableCell>
                      <TableCell align="right">
                        <b>Purpose</b>
                      </TableCell>
                      <TableCell align="right">
                        <b>Location</b>
                      </TableCell>
                      <TableCell align="right">
                        <b>Edit</b>
                      </TableCell>
                      <TableCell align="right">
                        <b>Remove</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {processors &&
                      processors.map((process) => (
                        <TableRow key={process.id}>
                          <TableCell component="th" scope="row">
                            {process.name}
                          </TableCell>
                          <TableCell align="right">{process.purpose}</TableCell>
                          <TableCell align="right">
                            {process.location}
                          </TableCell>
                          <TableCell align="right">
                            <TransitionsModal
                              setRender={setRender}
                              process={process}
                            />
                          </TableCell>
                          <TableCell align="right">
                            {" "}
                            <IconButton onClick={() => handleOpen(process)} aria-label="delete">
                              <DeleteIcon  />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleSubmit} color="secondary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
