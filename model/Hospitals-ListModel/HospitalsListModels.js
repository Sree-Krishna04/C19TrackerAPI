import mongoose from "mongoose";
import HospitalListSchema from "./HospitalsListSchema.js";
const hospitalListModelGenerator = function (collection) {
  const hospitalsListSchema = HospitalListSchema.hospitalListSchema;
  const hospitalListDatabase = mongoose.connection.useDb("Hospitals-List");
  return hospitalListDatabase.model(
    `${collection}HospitalsList`,
    hospitalsListSchema,
    collection
  );
};
export default { hospitalListModelGenerator };
