import mongoose from "mongoose";

const searchSchema = new mongoose.Schema(
  {
    term: { type: String, required: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  }
);

// Model
export const SearchModel = mongoose.model("Search", searchSchema);

// Functions
export const createSearch = async (values: Record<string, any>) => {
  const search = new SearchModel(values);

  return await search.save();
};
