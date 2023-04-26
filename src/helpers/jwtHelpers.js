import jwt from "jsonwebtoken";
import { insertSession } from "../models/sessions/SessionModel.js";
import { updateOneAdminUser } from "../models/adminUserModel/AdminUserModel.js";

const signAccessJWT = async (payload) => {
  const accessJWT = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
  const obj = {
    token: accessJWT,
    type: "accessJWT",
  };
  await insertSession(obj);
  return accessJWT;
};

const signRefreshJWT = async (payload) => {
  const refreshJWT = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });

  await updateOneAdminUser(payload, { refreshJWT });
  return refreshJWT;
};
export const createJWTs = async (payload) => {
  return {
    accessJWT: await signAccessJWT(payload),
    refreshJWT: await signRefreshJWT(payload),
  };
};
