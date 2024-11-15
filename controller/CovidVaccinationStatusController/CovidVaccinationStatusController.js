import CovidCasesListModels from "../../model/Covid-Cases-ListModel/CovidCasesListModels.js";
import CollectionsLister from "../GetCollectionsController/GetCollectionsController.js";
const covidVaccinationStatusFunction = async function (request, response) {
  try {
    let collectionJSON = {};
    const Collections = await CollectionsLister.collectionLister();
    const collections = Object.values(Collections);
    for (const collection of collections) {
      const covidCasesListModel =
        CovidCasesListModels.covidCasesSchemaModelGenerator(collection);
      const totalAliveQuery = {
        CovidStatus: { $ne: "Dead" },
      };
      const totalAliveVaccinatedQuery = {
        VaccineStatus: true,
        CovidStatus: { $ne: "Dead" },
      };
      const totalAliveQueryResult = await covidCasesListModel.countDocuments(
        totalAliveQuery
      );
      const totalAliveVaccinatedQueryResult =
        await covidCasesListModel.countDocuments(totalAliveVaccinatedQuery);
      const percentageOfVaccinated =
        (totalAliveVaccinatedQueryResult * 100) / totalAliveQueryResult;
      collectionJSON[collection] = {
        totalAlive: totalAliveQueryResult,
        totalAliveVaccinated: totalAliveVaccinatedQueryResult,
        percentageOfVaccinated: percentageOfVaccinated,
      };
    }
    const responseJSON = { message: "OK", projection: collectionJSON };
    response.status(200);
    response.json(responseJSON);
  } catch (e) {
    response.status(500);
    response.json({ message: "Internal Server Error" });
  }
};
export default { covidVaccinationStatusFunction };
