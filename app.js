const express = require("express");

const app = express();

const PORT = 4000;

const router = require("./src/routes/index.routes");

app.use("/", router);

app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
