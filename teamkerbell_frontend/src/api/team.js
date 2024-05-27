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

