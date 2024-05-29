import { sendRequest } from "../utils/request";
import { teamInstance } from "./instance";

// 일정 전달 /team/{team_id}/progress , post

/**
 * 1. 함수 만들기
 * 2. 사용하기 (useEffect)
 */
//팀 일정 전달
export const teamProgress = (teamId) =>
  sendRequest(teamInstance, "post", `/${teamId}/progress`);


//공모전 모든 팀 리스트 정보 조회
export const getAllTeamList = () =>
  sendRequest(teamInstance, "get", `/teamList`);


//공모전 정보 받아오기
export const getTeamCompDetail = (teamId) =>
  sendRequest(teamInstance, "get", `/${teamId}/compinfo`);

//팀원 정보 받아오기
export const getTeamMemInfo = (teamId) =>
  sendRequest(teamInstance, "get", `/${teamId}/members`);

//비매너신고 기본정보 받아오기
export const getTeamReport = (teamId) =>
  sendRequest(teamInstance, "get", `/${teamId}/report`);

//비매너 신고하기
export const sendTeamReport = (teamId, user, rude, reporter) =>
  sendRequest(teamInstance, "post", `/${teamId}/report`, {
    user: user,
    rude: rude,
    reporter: reporter,
  });

export const getEvaluate = (teamId) =>
  sendRequest(teamInstance, "get", `/${teamId}/evaluation/end`);

export const sendEvaluate = (teamId, score_tags, improvements, review) =>
  sendRequest(teamInstance, "post", `/${teamId}/evaluation/end`, {
    score_tags: score_tags,
    improvements: improvements,
    review: review,
  });
