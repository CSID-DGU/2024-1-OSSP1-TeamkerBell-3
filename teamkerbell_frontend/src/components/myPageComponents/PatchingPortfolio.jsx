// src/team.js
import React, { useState, useEffect } from "react";
import styles from "./WritePotfolio.module.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteUserDetailResume,
  getUserProfile,
  patchUserDetailResume,
  setUserResume,
} from "../../api/user";

const PatchingPortfolio = ({ resumeData }) => {
  const [name, setName] = useState("");
  const [baeckjoonId, setBaeckjoonId] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [skill, setSkill] = useState("");
  const [projectExperience, setProjectExperience] = useState("");
  const [githubLink, setGithub] = useState("");
  const [sns, setSns] = useState("");
  const [email, setEmail] = useState(""); // data.email을 초기값으로 설정
  const [phone, setPhone] = useState(""); // data.phoneNumber을 초기값으로 설정
  const [imageSrc, setImageSrc] = useState(null);
  const [city, setCity] = useState("");
  const [districts, setDistricts] = useState([]);
  const [dong, setDong] = useState(""); // data.img를 초기값으로 설정
  const { resumeId } = useParams();
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  // useEffect를 사용하여 data 변경 시 컴포넌트 상태 업데이트
  useEffect(() => {
    const fetchImage = async () => {
      setIsLoading(true); // Start loading

      try {
        const response = await getUserProfile(userId);
        setImageSrc(response.data?.img || null);
      } catch (error) {
        console.error("Error loading image:", error);
        // Optionally, set a default image or error placeholder
      } finally {
        setIsLoading(false); // Finish loading
      }
    };

    fetchImage();

    setName(resumeData?.name || "");
    setBaeckjoonId(resumeData?.tier || "");
    setIntroduction(resumeData?.userIntro || "");
    setSkill(resumeData?.skill || "");
    setProjectExperience(resumeData?.experience || "");
    setGithub(resumeData?.githubLink || "");
    setSns(resumeData?.snsLink || "");
    setEmail(resumeData?.email || "");
    setPhone(resumeData?.phone || "");
    setCity(resumeData?.city || "");
    setDong(resumeData?.dong || "");
    setDistricts(regions[resumeData?.city] || []); // 지역 초기화
  }, [resumeData, userId]); // resumeData 변경 시에만 useEffect 실행

  const handleSave = async () => {
    // Implement save logic here
    console.log("Save button clicked");
    const response = await patchUserDetailResume(
      userId,
      resumeId,
      name,
      email,
      phone,
      baeckjoonId,
      introduction,
      skill,
      projectExperience,
      githubLink,
      sns,
      city,
      dong
    );
    if (response.status == 200) {
      alert("이력서 수정이 완료됐습니다!");
      navigate(`/user/${userId}/mypage/resumes`);
    }
  };
  const handleCancel = () => {
    // Implement cancel logic here
    console.log("Cancel button clicked");
    navigate(`/user/${userId}/mypage/resumes`);
  };
  const handleDeleteButton = async () => {
    if (window.confirm("정말 이력서를 삭제하시겠습니까?")) {
      try {
        const response = await deleteUserDetailResume(userId, resumeId);
        if (response.status === 204) {
          // 상태 코드 확인
          alert("삭제가 완료됐습니다!");
          navigate(`/user/${userId}/mypage/resumes`);
        } else {
          // 삭제 실패 시 에러 처리 (예: 알림 메시지 표시)
          console.error("Error deleting resume:", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting resume:", error);
        // 예외 처리 (예: 네트워크 오류)
      }
    }
  };
  const regions = {
    서울특별시: ["강남구", "서초구", "종로구"],
    부산광역시: ["해운대구", "남구", "동래구"],
    대구광역시: ["수성구", "중구"],
    인천광역시: ["부평구", "계양구"],
    광주광역시: ["북구", "남구"],
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setCity(selectedCity);
    setDistricts(regions[selectedCity]);
  };

  const handleGunGuChange = (e) => {
    const selectedDistrict = e.target.value;
    setDong(selectedDistrict);
  };

  return (
    <div className={styles.title}>
      <div className={styles.titleButton}>
        <h1>이력서 수정하기</h1>
        <button className={styles.deleteButton} onClick={handleDeleteButton}>
          이력서 삭제하기
        </button>
      </div>

      <div className={styles.basicInfo}>
        <div className={styles.imageContainer}>
          <div className={styles.profileImageContainer}>
            <label htmlFor="profileImage" className={styles.imageLabel}>
              {imageSrc && (
                <img
                  src={imageSrc}
                  alt="preview"
                  className={styles.profileImage}
                />
              )}
            </label>
          </div>
        </div>
        <div className={styles.nameToPhoneNumber}>
          <div className={styles.infoItem}>
            <div className={styles.infoName}>
              <h3 className={styles.noMargin}>성명</h3>
              <span className={styles.redColorNoMargin}>*</span>
            </div>
            <form>
              <input
                placeholder="ex) 홍길동"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </form>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoName}>
              <h3>이메일</h3>
              <span className={styles.redColor}> *</span>
            </div>
            <form>
              <input
                placeholder="ex) hkj0206@dgu.ac.kr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </form>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoName}>
              <h3>연락처</h3>
              <span className={styles.redColor}> *</span>
            </div>
            <form>
              <input
                placeholder="ex) 010-5820-4625"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </form>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoName}>
              <h3>지역 설정</h3>
              <span className={styles.redColor}> *</span>
            </div>
            <div className={styles.container}>
              <label htmlFor="city-select"></label>
              <select
                id="city-select"
                class={styles.select}
                value={city}
                onChange={handleCityChange}
              >
                <option value="">시 선택</option>
                {Object.keys(regions).map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>

              <label htmlFor="district-select"></label>
              <select
                id="district-select"
                class={styles.select}
                value={dong}
                onChange={handleGunGuChange}
              >
                <option value="">군/구 선택</option>
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.baeckjoon}>
        <div className={styles.backjoonItem}>
          <div className={styles.infoName}>
            <h3>백준 아이디</h3>
            <span className={styles.redColor}> </span>
          </div>
          <form>
            <input
              placeholder="백준에서 사용하시는 아이디를 입력해주세요"
              value={baeckjoonId}
              onChange={(e) => setBaeckjoonId(e.target.value)}
            />
          </form>
        </div>
      </div>

      <div className={styles.introduceMyself}>
        <div className={styles.infoName}>
          <h3>자기 소개</h3>
          <span className={styles.redColor}> *</span>
        </div>
        <form>
          <input
            placeholder="ex) 안녕하세요. 풀스택 개발자 홍동국입니다! 저는 밝고 청량한 성격으로 항상 팀원들의 분위기를 살펴주고, 팀원들과 함께 이뤄나가는 것을 지향합니다."
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
          />
        </form>
      </div>

      <div className={styles.introduceMyself}>
        <div className={styles.infoName}>
          <h3>기술 스택</h3>
          <span className={styles.redColor}> *</span>
        </div>
        <form>
          <input
            placeholder="ex) React, Node.js, Python"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
          />
        </form>
      </div>

      <div className={styles.introduceMyself}>
        <div className={styles.infoName}>
          <h3>프로젝트 경험</h3>
          <span className={styles.redColor}> *</span>
        </div>
        <form>
          <input
            placeholder="ex) 저는 기존에 동국톤에 나가 ~~~~~"
            value={projectExperience}
            onChange={(e) => setProjectExperience(e.target.value)}
          />
        </form>
      </div>

      <div className={styles.github}>
        <div className={styles.infoName}>
          <h3>Github</h3>
          <span className={styles.redColor}>*</span>
        </div>
        <form>
          <input
            placeholder="ex) https://github.com/username"
            value={githubLink}
            onChange={(e) => setGithub(e.target.value)}
          />
        </form>
      </div>

      <div className={styles.github}>
        <div className={styles.infoName}>
          <h3>기타 SNS ex.Instagram, Facebook, T-Stroy 등</h3>
          <span className={styles.redColor}></span>
        </div>
        <form>
          <input
            placeholder="ex) 인스타 :@999999999jin"
            value={sns}
            onChange={(e) => setSns(e.target.value)}
          />
        </form>
      </div>

      <div className={styles.editprofilebuttons}>
        <button
          className={styles.editprofileCancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button className={styles.editprofileSaveButton} onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default PatchingPortfolio;
