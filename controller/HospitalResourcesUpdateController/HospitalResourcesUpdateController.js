import { InvalidRequestException } from "../../exceptions/CustomExceptions.js";
import { ItemNotFoundException } from "../../exceptions/CustomExceptions.js";
import HospitalsListModels from "../../model/Hospitals-ListModel/HospitalsListModels.js";
const hospitalResourceUpdateFunction = async function (request, response) {
  try {
    const requestBody = request.body;
    if (requestBody["cityName"] == null) {
      throw new InvalidRequestException("Invalid Request");
    }
    if (requestBody["Name"] == null) {
      throw new InvalidRequestException("Invalid Request");
    }
    const hospitalListModel = HospitalsListModels.hospitalListModelGenerator(
      requestBody["cityName"]
    );
    const searchQuery = { Name: requestBody["Name"] };
    const queryResult = await hospitalListModel.find(searchQuery);
    if (queryResult.length == 0) {
      throw new ItemNotFoundException("Hospital Not Found");
    } else {
      const hospitalUpdate = new hospitalListModel({
        Name: requestBody["Name"],
        Beds: requestBody["Beds"],
        Ventilators: requestBody["Ventilators"],
        ICUCapacity: requestBody["ICUCapacity"],
        Syringes: requestBody["Syringes"],
        VaccineCapsules: requestBody["VaccineCapsules"],
        Doctors: requestBody["Doctors"],
        Nurses: requestBody["Nurses"],
      });
      await hospitalUpdate.save();
    }
    response.status(200);
    response.json({ message: "OK" });
  } catch (e) {
    console.log(e);
    if (e.name == "InvalidRequestException") {
      response.status(400);
      response.json({ message: "Bad Request" });
    } else if (e.name == "ItemNotFoundException") {
      response.status(404);
      response.json({ message: "Hospital Not Found" });
    } else {
      response.status(500);
      response.json({ message: "Internal Server Error" });
    }
  }
};
export default { hospitalResourceUpdateFunction };
