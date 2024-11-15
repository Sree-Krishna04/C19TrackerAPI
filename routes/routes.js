import express from "express";
import CovidCaseDetailedReporterController from "../controller/CovidCaseDetailedReporterController/CovidCaseDetailedReporterController.js";
import CovidCaseBasicReporterController from "../controller/CovidCaseBasicReporterController/CovidCaseBasicReporterController.js";
import CovidCaseUpdateController from "../controller/CovidCaseUpdateController/CovidCaseUpdateController.js";
import CovidVaccinationStatusController from "../controller/CovidVaccinationStatusController/CovidVaccinationStatusController.js";
import HospitalResourcesController from "../controller/HospitalResourcesController/HospitalResourcesController.js";
import HospitalResourceUpdateController from "../controller/HospitalResourcesUpdateController/HospitalResourcesUpdateController.js";
import GetCollectionsController from "../controller/GetCollectionsController/GetCollectionsController.js";
const router = express.Router();
try {
  router.get("/", function (request, response) {
    response.status(200).json({ message: "GET RESPONSE" });
  });
  router.get(
    "/covid/cases/",
    CovidCaseBasicReporterController.covidCaseBasicReporterFunction
  );
  router.get(
    "/covid/cases/:cityName",
    CovidCaseDetailedReporterController.covidCaseDetailedReporterFunction
  );
  router.post(
    "/covid/cases/update/",
    CovidCaseUpdateController.covidCaseUpdateFunction
  );
  router.get(
    "/covid/vaccination-status/",
    CovidVaccinationStatusController.covidVaccinationStatusFunction
  );
  router.get(
    "/covid/hospitals/resources/",
    HospitalResourcesController.hospitalResourceFunction
  );
  router.put(
    "/covid/hospitals/resources/update/",
    HospitalResourceUpdateController.hospitalResourceUpdateFunction
  );
  router.get(
    "/get-collections/",
    GetCollectionsController.getCollectionsFunction
  );
  router.use(function (request, response) {
    response.status(404).json({ message: "Resource Not Found" });
  });
} catch (e) {
  router.use(function (request, response) {
    response.status(500).json({ message: "Server Router Error" });
  });
}
export default { router };
