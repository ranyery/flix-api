import mongoose from "mongoose";

const deviceUserInfo = new mongoose.Schema(
  {
    appCodeName: { type: String, required: false },
    cookieEnabled: { type: Boolean, required: false },
    language: { type: String, required: false },
    platform: { type: String, required: false },
    userAgent: { type: String, required: false },
    userAgentData: { type: Object, required: false },
    width: { type: Number, required: false },
    height: { type: Number, required: false },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  }
);

// Model
export const DeviceUserInfoModel = mongoose.model(
  "DeviceUserInfo",
  deviceUserInfo
);

// Functions
export const saveDeviceUserInfo = async (values: Record<string, any>) => {
  const deviceInfo = new DeviceUserInfoModel(values);

  return await deviceInfo.save();
};
