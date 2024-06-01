import { sendRequest } from "../utils/request";
import { teamInstance } from "./instance";

// 일정 전달 /team/{team_id}/progress , post

/**
 * 1. 함수 만들기
 * 2. 사용하기 (useEffect)
 */
//팀 일정 전달
export const teamProgress = (teamId) =>
  sendRequest(teamInstance, "post", `/${teamId}/progress/`);

//공모전 모든 팀 리스트 정보 조회
export const getAllTeamList = () =>
  sendRequest(teamInstance, "get", `/teamList`);

//공모전 정보 받아오기
export const getTeamCompDetail = (teamId) =>
  sendRequest(teamInstance, "get", `/${teamId}/compinfo`);

//팀원 정보 받아오기
export const getTeamMemInfo = (teamId) =>
  sendRequest(teamInstance, "get", `/${teamId}/members/`);

//비매너신고 기본정보 받아오기
export const getTeamReport = (teamId) =>
  sendRequest(teamInstance, "get", `/${teamId}/report/`);

//비매너 신고하기
export const sendTeamReport = (teamId, user, rude, reporter) =>
  sendRequest(teamInstance, "post", `/${teamId}/report/`, {
    user: user,
    rudeness: rude,
    reporter: reporter,
  });

//상호평가 기본정보 받아오기
export const getEvaluate = (teamId) =>
  sendRequest(teamInstance, "get", `/${teamId}/evaluation/end/`);

//상호평가 전송하기
export const sendEvaluate = (teamId, score_tags, improvements, review) =>
  sendRequest(teamInstance, "post", `/${teamId}/evaluation/end/`, {
    score_tags: score_tags,
    improvements: improvements,
    review: review,
  });

//활동종료 정보 불러오기
export const getManage = (teamId) =>
  sendRequest(teamInstance, "get", `/${teamId}/teamManager/`);

//활동종료 투표하기
export const sendVote = (teamId, id) =>
  sendRequest(teamInstance, "post", `/${teamId}/voteEnd/`, {
    id: id,
  });

//활동종료 추가매칭
export const sendPlusMatching = (teamId, roleList) =>
  sendRequest(teamInstance, "post", `/${teamId}/plusMatching`, {
    roleList: roleList,
  });

//활동종료 팀원퇴출
export const sendKick = (teamId, user, reason) =>
  sendRequest(teamInstance, "post", `/${teamId}/kick`, {
    user: user,
    reason: reason,
  });

//활동종료 중도하차
export const sendRun = (teamId, user, reason) =>
  sendRequest(teamInstance, "post", `/${teamId}/run`, {
    user: user,
    reason: reason,
  });
