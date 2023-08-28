const express = require("express");
const cors = require("cors");
require('dotenv').config();
const { AuthRoute } = require("./routes/AuthRoute");
const { connection } = require("./Config/db");
const { ProjectRoute } = require("./routes/ProjectRoute");
let port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.use("/", AuthRoute);
app.use("/", ProjectRoute);

app.get("/", (req, res) => {
    try {
        res.send("Home");
    } catch (err) {
        res.send(err);
    }
});

app.listen(port, async () => { // Change 'app.listen' to 'Router.listen'
    try {
        await connection;
        console.log("connected"); // Correct the spelling of "connected"
    } catch (err) {
        console.log(err);
    }
    console.log(`running on port ${port}`);
});

