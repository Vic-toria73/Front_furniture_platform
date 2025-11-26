import api from "./api";

export const getMyAccount = () => {
  return api.get("/users/me");
};

export const updateMyAccount = (data: {
  firstName?: string;
  lastName?: string;
  email?: string;
}) => {
  return api.put("/users/me", data);
};

export const updateMyPassword = (data: {
  oldPassword: string;
  newPassword: string;
}) => {
  return api.put("/users/me/password", data);
};
