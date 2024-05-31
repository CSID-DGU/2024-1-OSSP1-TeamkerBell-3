import { sendRequest } from "../utils/request";
import { userInstance } from "./instance";

//프로필 정보 받아오기
export const login = (email, password) =>
  sendRequest(userInstance, "post", `/login`, {
    email: email,
    password: password,
  });

//프로필 정보 받아오기
export const register = (nickname, email, password, phone) =>
  sendRequest(userInstance, "post", `/register`, {
    //fields = ['nickname', 'phone', 'email', 'password']
    nickname: nickname,
    email: email,
    password: password,
    phone: phone,
  });

//프로필 정보 받아오기
export const getUserProfile = (userId) =>
  sendRequest(userInstance, "get", `/${userId}/mypage`);

//프로필 편집하기
export const patchUserProfile = (userId, nickname, phone, email, img) =>
  sendRequest(userInstance, "put", `/${userId}/mypage/`, {
    nickname: nickname,
    phone: phone,
    email: email,
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

export const setUserResume = (
  userId,
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
  sendRequest(userInstance, "post", `/${userId}/mypage/resumes`, {
    userId,
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
/*/* id = models.AutoField(primary_key=True,null=False)
    user = models.ForeignKey(BasicUser, related_name='resumes', on_delete=models.CASCADE)
    name = models.CharField(null=False,max_length=50)
    email = models.CharField(null=False,max_length=50)
    phone = models.CharField(null=False,max_length=50)
    tier = models.CharField(null=True,max_length=50)
    userIntro = models.CharField(null=True,max_length=500)
    skill = models.CharField(null=True,max_length=500)
    experience = models.CharField(null=True,max_length=500)
    githubLink = models.CharField(null=True,max_length=100)
    snsLink = models.CharField(null=True,max_length=200)
    city = models.CharField(null=True,max_length=20)
    dong = models.CharField(null=True,max_length=20) */

//세부 이력서 조회하기
export const getUserDetailResume = (userId, resumeId) =>
  sendRequest(userInstance, "get", `/${userId}/mypage/resume/${resumeId}`);

//세부 이력서 수정하기
export const patchUserDetailResume = (
  userId,
  resumeId,
  name,
  email,
  phone,
  tier,
  userIntro,
  skill,
  experience,
  githubLink,
  snsLink,
  city,
  dong
) =>
  sendRequest(userInstance, "patch", `/${userId}/mypage/resume/${resumeId}`, {
    name,
    email,
    phone,
    tier,
    userIntro,
    skill,
    experience,
    githubLink,
    snsLink,
    city,
    dong,
  });

//세부 이력서 삭제하기
export const deleteUserDetailResume = (userId, resumeId) =>
  sendRequest(userInstance, "delete", `/${userId}/mypage/resume/${resumeId}`);

//찜한 공모전 모아보기
export const getCompLiked = (userId) =>
  sendRequest(userInstance, "get", `/${userId}/mypage/compLiked`);

//공모전 찜하기
export const setCompLiked = (userId, compId) =>
  sendRequest(userInstance, "post", `/${userId}/compLike/${compId}`);

//프로젝트들 가져오기
export const getMyProjects = (userId) =>
  sendRequest(userInstance, "get", `/${userId}/mypage/teams`);

//팀 관리 정보 가져오기
export const getMyTeams = (userId, teamId) =>
  sendRequest(userInstance, "get", `/${userId}/mypage/team/${teamId}/teams`);

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

export const cancelApplying = (user_id, team_id) =>
  sendRequest(
    userInstance,
    "delete",
    `/${user_id}/mypage/team/${team_id}/cancel`
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
export const getTeamRecruitedResumes = (userId, teamId) =>
  sendRequest(userInstance, "get", `/${userId}/mypage/team/${teamId}/resume`);
//<int:user_id>/mypage/team/<int:team_id>/resume
//지원자 이력서 상세보기

export const getTeamRecruitedResumeDetail = (userId, teamId, resumeId) =>
  sendRequest(
    userInstance,
    "get",
    `/${userId}/mypage/team/${teamId}/resume/${resumeId}`
  );

export const setTeamRecruitedResumeEnd = (userId, teamId, resumeId, isAccept) =>
  sendRequest(
    userInstance,
    "post",
    `/${userId}/mypage/team/${teamId}/resume/${resumeId}`,
    { accept: isAccept }
  );
