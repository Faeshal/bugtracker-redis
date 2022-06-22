"use strict";
const express = require("express");
const app = express();
const PORT = process.env.PORT || 2000;
const morgan = require("morgan");
const paginate = require("express-paginate");
const projectRoutes = require("./route/project");
const cardRoutes = require("./route/card");
const { errorHandler } = require("./middleware/errorHandler");
const consumer = require("./event/consumer");
// const eventConsumer = require("./event/consumer/sub");
// const redisSub = require("./redismq/sub");
const log = require("log4js").getLogger("entrypoint");
log.level = "info";

// * logger
app.use(morgan("tiny"));

// * Body Parser
app.use(express.json());

// * paginate
app.use(paginate.middleware(5, 20));

//  * Routing
app.use(projectRoutes);
app.use(cardRoutes);

app.get("/", (res) => {
  res.json({ success: true, message: "Project Service UP!" });
});

// * Custom Error Handler
app.use(errorHandler);

//  * SERVER LISTEN
app.listen(PORT, () => {
  log.info(`Project service is running on port ${PORT}`);
});

// * Event Consume
// eventConsumer();
consumer();
