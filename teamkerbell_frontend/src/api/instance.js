import axios from "axios";
//import { applyInterceptors } from "../utils/request";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

// 우리 서버의 기본 주소
const defaultInstance = axios.create({
  baseURL: BASE_URL,
});

// 요청 인터셉터를 추가하여 요청이 전송되기 전에 실행
//applyInterceptors(defaultInstance);

const userInstance = axios.create(defaultInstance.defaults);
userInstance.defaults.baseURL += "/user";

const compInstance = axios.create(defaultInstance.defaults);
compInstance.defaults.baseURL += "/comp";

const teamInstance = axios.create(defaultInstance.defaults);
teamInstance.defaults.baseURL += "/team";

// const authInstance = axios.create(defaultInstance.defaults);
// authInstance.defaults.baseURL += "/auth";

// // 요청 인터셉터를 추가하여 요청이 전송되기 전에 실행
// applyInterceptors(authInstance);

export { defaultInstance, userInstance, compInstance, teamInstance };
