import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import { Grid, Box } from "@material-ui/core";

const useStyles = makeStyles({
  addModal: {
    textAlign: "left",
  },
});

export default function EmbededTable() {
  const classes = useStyles();
  const [processors, setProcessors] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/subprocessor")
      .then((res) => setProcessors(res.data.data));
  }, []);

  return (
    <Container>
      <Box>
        <Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <h2>Subprocessors List</h2>
          </Grid>
          <Grid
            className={classes.addModal}
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
          >
            <TableContainer component={Paper}>
              <Table aria-label="caption table">
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
                        <TableCell align="right">{process.location}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
