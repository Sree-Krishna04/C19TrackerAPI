import HospitalsListModels from "../../model/Hospitals-ListModel/HospitalsListModels.js";
import CollectionsLister from "../GetCollectionsController/GetCollectionsController.js";
let collectionJSON = {};
const hospitalResourceFunction = async function (request, response) {
  try {
    const Collections = await CollectionsLister.collectionLister();
    const collections = Object.values(Collections);
    for (const collection of collections) {
      const hospitalListModel =
        HospitalsListModels.hospitalListModelGenerator(collection);
      const queryResult = await hospitalListModel.find();
      collectionJSON[collection] = queryResult;
    }
    const responseJSON = { message: "OK", projection: collectionJSON };
    response.status(200);
    response.json(responseJSON);
  } catch (e) {
    console.log(e);
    response.status(500);
    response.json({ message: "Internal Server Error" });
  }
};
export default { hospitalResourceFunction };
