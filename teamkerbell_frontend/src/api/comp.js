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

//공모전 팀 리스트 정보 조회
export const getTeamList = (compId) =>
  sendRequest(compInstance, "get", `/${compId}`);

//선택 팀 생성
export const setSelectTeam = (
  compId,
  userId,
  recruitRole,
  recruitNumber,
  projectStartDate,
  name,
  intro,
  method,
  language,
  qualification,
  resumeId
) =>
  sendRequest(compInstance, "post", `/${compId}/createTeam/${userId}`, {
    recruitRole: recruitRole,
    recruitNumber: recruitNumber,
    projectStartDate: projectStartDate,
    name: name,
    intro: intro,
    method: method,
    language: language,
    qualification: qualification,
    resumeId: resumeId,
  });

//선택 팀에서 자신의 이력서 가져오기
export const getMyResumeForCreateTeam = (compId, userId) =>
  sendRequest(compInstance, "get", `/${compId}/createTeam/${userId}`);

//랜덤 팀 생성
export const setRandomTeam = (
  compId,
  user,
  role,
  city,
  dong,
  isLeader,
  recruitNum
) =>
  sendRequest(compInstance, "post", `/${compId}/createRandomTeam/`, {
    user: user,
    role: role,
    city: city,
    dong: dong,
    isLeader: isLeader,
    recruitNum: recruitNum,
  });

//랜덤 팀 생성
export const setRandomTeamMember = (
  compId,
  user,
  role,
  city,
  dong,
  isLeader,
  recruitNum
) =>
  sendRequest(compInstance, "post", `/${compId}/rmAlgorithms/`, {
    user: user,
    role: role,
    city: city,
    dong: dong,
    isLeader: isLeader,
    recruitNum: recruitNum,
  });

//공모전 내용/후기
export const getReviewList = (compId) =>
  sendRequest(compInstance, "get", `/${compId}/reviewList`);

//팀 상세/설명
export const getTeamDetail = (compId, teamId) =>
  sendRequest(compInstance, "get", `/${compId}/teamList/${teamId}/detail`);

//팀 상세/설명, 지원서 제출(이력서 전달)
export const setApplyResume = (compId, teamId, userId, resumeId, role) =>
  sendRequest(
    compInstance,
    "post",
    `/${compId}/teamList/${teamId}/apply/${userId}`,
    {
      resumeId: resumeId,
      role: role,
    }
  );

//팀 상세/설명, 지원서 제출(이력서 가져오기)
export const getMyResume = (compId, teamId, userId) =>
  sendRequest(
    compInstance,
    "get",
    `/${compId}/teamList/${teamId}/apply/${userId}`
  );

//팀장 이력서 상세 보기
export const getLeaderResume = (compId, teamId) =>
  sendRequest(
    compInstance,
    "get",
    `/${compId}/teamList/${teamId}/leaderResume`
  );
