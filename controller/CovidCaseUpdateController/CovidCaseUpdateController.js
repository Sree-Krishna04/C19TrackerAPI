import { InvalidRequestException } from "../../exceptions/CustomExceptions.js";
import CovidCasesListModels from "../../model/Covid-Cases-ListModel/CovidCasesListModels.js";
const covidCaseUpdateFunction = async function (request, response) {
  try {
    const requestBody = request.body;
    if (requestBody["cityName"] == null) {
      throw new InvalidRequestException("Invalid Request");
    }
    const covidCaseListModel =
      CovidCasesListModels.covidCasesSchemaModelGenerator(
        requestBody["cityName"]
      );
    const covidCaseUpdate = new covidCaseListModel({
      Name: requestBody["Name"],
      Age: requestBody["Age"],
      Sex: requestBody["Sex"],
      CovidStatus: requestBody["CovidStatus"],
      VaccineStatus: requestBody["VaccineStatus"],
      Dosage: requestBody["Dosage"],
    });
    await covidCaseUpdate.save();
    response.status(200);
    response.json({ message: "OK" });
  } catch (e) {
    console.log(e);
    if (e.name == "InvalidRequestException" || e.name == "ValidationError") {
      response.status(400);
      response.json({ message: "Bad Request" });
    } else {
      response.status(500);
      response.json({ message: "Internal Server Error" });
    }
  }
};
export default { covidCaseUpdateFunction };
