const app = require("./app");

//port
const port = process.env.PORT || 4000;

//running server
app.listen(port, () => {
  console.log("Running on port " + port);
});

