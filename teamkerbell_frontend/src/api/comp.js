import { sendRequest } from "../utils/request";
import { compInstance } from "./instance";

export const getComps = () => sendRequest(compInstance, "get", "/");
