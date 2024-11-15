import express from "express";
import controller from "./routes/routes.js";
import mongoose from "mongoose";
import "dotenv/config";
const app = express();
let covidCasesClusterListDatabaseInstance;
try {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT);
  console.log("Listening On port 3000");
  covidCasesClusterListDatabaseInstance = await mongoose.connect(
    process.env.CovidCaseListClusterDatabaseURL
  );
  console.log("Database Connected");
  const router = controller.router;
  app.use(function (request, response, next) {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader(
      "Access-Control-Allow-Methods",
      "GET,PUT,POST,DELETE,OPTIONS"
    );
    response.setHeader("Access-Control-Allow-Credentials", "true");
    response.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Requested-With, Origin,Accept"
    );
    response.setHeader("Content-Type", "application/json");
    next();
  });
  app.options("/*", function (request, response) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header(
      "Access-Control-Allow-Methods",
      "GET,PUT,POST,DELETE,OPTIONS"
    );
    response.header(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, Content-Length, X-Requested-With"
    );
    response.send(200);
  });
  app.use(express.json());
  app.use(router);
} catch (e) {
  console.log("Error Occured");
  console.log(e);
}
