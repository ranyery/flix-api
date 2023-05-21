import mongoose from "mongoose";

const requestDetails = new mongoose.Schema(
  {
    ip: { type: String, required: false },
    method: { type: String, required: false },
    requestUrl: { type: String, required: false },
    statusCode: { type: Number, required: false },
    browser: { type: String, required: false },
    version: { type: String, required: false },
    os: { type: String, required: false },
    platform: { type: String, required: false },
    IsMobile: { type: Boolean, required: false },
    timeToResponse: { type: String, required: false },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  }
);

// Model
export const RequestDetailsModel = mongoose.model(
  "RequestDetails",
  requestDetails
);

// Functions
export const saveRequestDetails = async (values: Record<string, any>) => {
  const requestDetails = new RequestDetailsModel(values);

  return await requestDetails.save();
};
