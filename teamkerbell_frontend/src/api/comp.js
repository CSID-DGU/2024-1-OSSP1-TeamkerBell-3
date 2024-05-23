import { sendRequest } from "../utils/request";
import { compInstance } from "./instance";

export const getComps = () => sendRequest(compInstance, "get", "/");

export const registerComp = (
  name,
  startDate,
  endDate,
  organization,
  eligibillty,
  applicationMethod,
  context,
  reward,
  contact,
  link,
  img,
) =>
  sendRequest(compInstance, "post", "/register", {
    name: name,
    startDate: startDate,
    endDate: endDate,
    organization: organization,
    eligibillty: eligibillty,
    applicationMethod,applicationMethod,
    context: context,
    reward: reward,
    contact: contact,
    link: link,
    img:img,
  });
