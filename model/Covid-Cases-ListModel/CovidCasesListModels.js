import mongoose from "mongoose";
import CovidCasesListSchema from "./CovidCasesListSchema.js";
const covidCasesSchemaModelGenerator = function (collection) {
  const covidCasesListSchema = CovidCasesListSchema.covidCaseListSchema;
  const CovidCaseListDatabase = mongoose.connection.useDb("Covid-Cases-List");
  return CovidCaseListDatabase.model(
    `${collection}CovidCasesListModel`,
    covidCasesListSchema,
    collection
  );
};
export default { covidCasesSchemaModelGenerator };
