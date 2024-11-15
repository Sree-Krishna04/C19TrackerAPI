import mongoose from "mongoose";
const schema = mongoose.Schema;
const covidCaseListSchema = new schema(
  {
    Name: { type: String, required: true },
    Age: { type: Number, required: true },
    Sex: { type: String, required: true },
    CovidStatus: { type: String, required: true },
    VaccineStatus: { type: Boolean, required: true },
    Dosage: { type: Number, required: true },
  },
  { versionKey: false }
);
export default { covidCaseListSchema };
