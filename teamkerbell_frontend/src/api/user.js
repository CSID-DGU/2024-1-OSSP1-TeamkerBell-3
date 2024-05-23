import { sendRequest } from "../utils/request";
import { userInstance } from "./instance";

//프로필 정보 받아오기
export const login = (email, password) =>
  sendRequest(userInstance, "post", `/login`, {
    email: email,
    password: password,
  });

//프로필 정보 받아오기
export const register = (nickname, email, password, phoneNumber) =>
  sendRequest(userInstance, "post", `/register`, {
    //fields = ['nickname', 'phone', 'email', 'password']
    nickname: nickname,
    email: email,
    password: password,
    phoneNumber: phoneNumber,
  });

//프로필 정보 받아오기
export const getUserProfile = (userId) =>
  sendRequest(userInstance, "get", `/${userId}/mypage`);

//프로필 편집하기
export const patchUserProfile = (userId, email, nickname, phone, img) =>
  sendRequest(userInstance, "put", `/${userId}/mypage/`, {
    email: email,
    nickname: nickname,
    phone: phone,
    img: img,
  });

//이력서 목록 가져오기
export const getUserResumes = (
  userId,
  id,
  user,
  name,
  email,
  phone,
  tier,
  userIntro,
  skill,
  experience,
  githubLik,
  snsLink,
  city,
  dong
) =>
  sendRequest(userInstance, "get", `/${userId}/mypage/resumes`, {
    id,
    user,
    name,
    email,
    phone,
    tier,
    userIntro,
    skill,
    experience,
    githubLik,
    snsLink,
    city,
    dong,
  });

export const setUserResume = (userId) =>
  sendRequest(userInstance, "post", `/${userId}/mypage/writeResume`);

//세부 이력서 조회하기
export const getUserDetailResume = (userId, resumeId) =>
  sendRequest(userInstance, "get", `/${userId}/mypage/resume/${resumeId}`);

//세부 이력서 수정하기
export const patchUserDetailResume = (userId, resumeId) =>
  sendRequest(userInstance, "patch", `/${userId}/mypage/resume/${resumeId}`);

//세부 이력서 삭제하기
export const deleteUserDetailResume = (userId, resumeId) =>
  sendRequest(userInstance, "delete", `/${userId}/mypage/resume/${resumeId}`);

//찜한 공모전 모아보기
export const getCompLiked = (userId) =>
  sendRequest(userInstance, "get", `/${userId}/mypage/compLiked`);

//공모전 찜하기
export const setCompLiked = (userId, compId) =>
  sendRequest(userInstance, "get", `/${userId}/mypage/compLike/${compId}`);

//팀 관리 정보 가져오기
export const getMyTeams = (userId, teamId) =>
  sendRequest(userInstance, "delete", `/${userId}/mypage/team/${teamId}/teams`);

//투표 종료투표
export const endProject = (userId, teamId) =>
  sendRequest(
    userInstance,
    "delete",
    `/${userId}/mypage/team/${teamId}/voteend`
  );

//팀 신청 취소
export const breakeTeam = (userId, teamId) =>
  sendRequest(
    userInstance,
    "delete",
    `/${userId}/mypage/team/${teamId}/breakteam`
  );

//나의 성취 가져오기
export const getMyAchievements = (userId) =>
  sendRequest(userInstance, "get", `/${userId}/mypage/myachievements`);

//팀 모집 완료
export const compliteTeamMatching = (userId, teamId) =>
  sendRequest(
    userInstance,
    "post",
    `/${userId}/mypage/team/${teamId}/maketeam`
  );

//지원자 이력서들 보기
export const getTeamRecruitedResumes = (userId) =>
  sendRequest(userInstance, "get", `/${userId}/mypage/team/`);

//지원자 이력서 상세보기
export const getTeamRecruitedResumeDetail = (userId, teamId, resumeId) =>
  sendRequest(
    userInstance,
    "get",
    `/${userId}/mypage/team/${teamId}/resume/${resumeId}`
  );
