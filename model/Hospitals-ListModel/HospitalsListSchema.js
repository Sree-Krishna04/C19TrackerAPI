import mongoose from "mongoose";
const schema = mongoose.Schema;
const hospitalListSchema = schema(
  {
    Name: { type: String, required: true },
    Beds: { type: Number, required: true },
    Ventilators: { type: Number, required: true },
    ICUCapacity: { type: Number, required: true },
    Syringes: { type: Number, required: true },
    VaccineCapsules: { type: Number, required: true },
    Doctors: { type: Number, required: true },
    Nurses: { type: Number, required: true },
  },
  { versionKey: false }
);
export default { hospitalListSchema };
