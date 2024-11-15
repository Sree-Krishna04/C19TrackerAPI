import CovidCasesListModels from "../../model/Covid-Cases-ListModel/CovidCasesListModels.js";
const covidCaseDetailedReporterFunction = async function (request, response) {
  let collectionJSON = {};
  try {
    const requestParameter = request.params;
    const covidCaseListModel =
      CovidCasesListModels.covidCasesSchemaModelGenerator(
        requestParameter["cityName"]
      );
    const activeCaseQuery = { CovidStatus: "Active" };
    const recoveredCaseQuery = { CovidStatus: "Recovered" };
    const deadCaseQuery = { CovidStatus: "Dead" };
    let queryResult = await covidCaseListModel.find(activeCaseQuery);
    collectionJSON["Active"] = queryResult;
    queryResult = await covidCaseListModel.find(recoveredCaseQuery);
    collectionJSON["Recovered"] = queryResult;
    queryResult = await covidCaseListModel.find(deadCaseQuery);
    collectionJSON["Dead"] = queryResult;
    const responseJSON = { message: "OK", projection: collectionJSON };
    response.status(200);
    response.json(responseJSON);
  } catch (e) {
    console.log(e);
    response.status(500);
    response.json({
      message: "Internal Server Error",
    });
  }
};
export default { covidCaseDetailedReporterFunction };
