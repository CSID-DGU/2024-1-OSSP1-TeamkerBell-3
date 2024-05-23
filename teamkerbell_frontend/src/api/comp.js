import { sendRequest } from "../utils/request";
import { compInstance } from "./instance";

export const getComps = () => sendRequest(compInstance, "get", "/");

export const registerComp = (
  name,
  startDate,
  endDate,
  organization,
  eligibillty,
  img,
  context,
  reward,
  contact,
  link
) =>
  sendRequest(compInstance, "post", "/register", {
    name: name,
    startDate: startDate,
    endDate: endDate,
    organization: organization,
    eligibillty: eligibillty,
    img: img,
    context: context,
    reward: reward,
    contact: contact,
    link: link,
  });
