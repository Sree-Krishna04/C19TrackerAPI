import CovidCaseListModels from "../../model/Covid-Cases-ListModel/CovidCasesListModels.js";
import CollectionsLister from "../GetCollectionsController/GetCollectionsController.js";
const covidCaseBasicReporterFunction = async function (request, response) {
  let collectionJSON = {};
  try {
    const Collections = await CollectionsLister.collectionLister();
    const collections = Object.values(Collections);
    for (const collection of collections) {
      const covidCaseListModel =
        CovidCaseListModels.covidCasesSchemaModelGenerator(collection);
      const queryResult = await covidCaseListModel.find();
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
export default { covidCaseBasicReporterFunction };
