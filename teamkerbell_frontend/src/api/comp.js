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
  theme
) =>
  sendRequest(compInstance, "post", "/register", {
    name: name,
    startDate: startDate,
    endDate: endDate,
    organization: organization,
    eligibillty: eligibillty,
    applicationMethod,
    applicationMethod,
    context: context,
    reward: reward,
    contact: contact,
    link: link,
    img: img,
    theme: theme,
  });

//공모전 정보 조회
export const getCompDetail = (compId) =>
  sendRequest(compInstance, "get", `/${compId}`);

//선택 팀 생성
export const setSelectTeam = (
  compId,
  recruitRole,
  recruitNumber,
  projectStartDate,
  intro,
  method,
  language,
  qualification,
  resumeId,
  check
) =>
  sendRequest(compInstance, "post", `/${compId}/createTeam`, {
    compId: compId,
    recruitRole: recruitRole,
    recruitNumber: recruitNumber,
    projectStartDate: projectStartDate,
    intro: intro,
    method: method,
    language: language,
    qualification: qualification,
    resumeId: resumeId,
    check: check,
  });

//랜덤 팀 생성
export const setRandomTeam = (
  compId,
  role,
  city,
  dong,
  isLeader,
  recruitNumber
) =>
  sendRequest(compInstance, "post", `/${compId}/createRandomTeam`, {
    compId: compId,
    role: role,
    city: city,
    dong: dong,
    isLeader: isLeader,
    recruitNumber: recruitNumber,
  });

//공모전 내용/후기
export const getReviewList = (compId) =>
  sendRequest(compInstance, "get", `/${compId}/reviewList`);

//팀 상세/설명
export const getTeamDetail = (compId, teamId) =>
  sendRequest(compInstance, "get", `/${compId}/teamList/${teamId}/detail`);

//팀 상세/설명, 지원서 제출
export const setApplyResume = (
  compId,
  teamId,
  teamInfo,
  resumeList,
  teamRole
) =>
  sendRequest(compInstance, "post", `/${compId}/teamList/${teamId}/apply`, {
    compId: compId,
    teamId: teamId,
    teamInfo: teamInfo,
    resumeList: resumeList,
    teamRole: teamRole,
  });

//팀장 이력서 상세 보기
export const getLeaderResume = (compId, teamId) =>
  sendRequest(
    compInstance,
    "get",
    `/${compId}/teamList/${teamId}/leaderResume`
  );
