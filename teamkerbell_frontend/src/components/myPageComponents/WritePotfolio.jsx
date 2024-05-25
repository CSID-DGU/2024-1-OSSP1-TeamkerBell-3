// src/team.js
import React, { useState, useEffect } from "react";
import styles from "./WritePotfolio.module.css";
import { useParams } from "react-router-dom";
import { uploadS3 } from "../../utils/uploadS3";

const WritePortfolio = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [interest, setInterest] = useState("");
  const [baeckjoonId, setBackjoonId] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [techStack, setTechStack] = useState("");
  const [projectExperience, setProjectExperience] = useState("");
  const [github, setGithub] = useState("");
  const [sns, setSns] = useState("");
  const [nickname, setNickname] = useState(""); // data.nickname을 초기값으로 설정
  const [email, setEmail] = useState(""); // data.email을 초기값으로 설정
  const [phone, setPhone] = useState(""); // data.phoneNumber을 초기값으로 설정
  const [imageFile, setImageFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null); // data.img를 초기값으로 설정
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const { userId } = useParams();
  // useEffect를 사용하여 data 변경 시 컴포넌트 상태 업데이트
  useEffect(() => {
    setNickname("");
    setEmail("");
    setPhone("");
    setImageSrc(null);
    console.log("[UseEffect] :", nickname, email, phone, imageSrc);
  }, []); // data 추가

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!imageFile && !imageSrc) {
      alert("이미지를 선택해주세요!");
      return;
    }

    setIsUploading(true);

    let finalImageUrl = imageSrc; // 기본값으로 imageSrc 사용

    try {
      if (imageFile) {
        const uploadedImageUrl = await uploadS3(imageFile);
        finalImageUrl = uploadedImageUrl; // 이미지 파일이 선택되었다면, 업로드된 이미지 URL 사용
      }
      setImageUrl(finalImageUrl);
    } catch (error) {
      console.error("[S3 Upload Error]:", error);
      alert("S3 업로드 에러가 났습니다! 다시 시도해주세요!");
    } finally {
      setIsUploading(false);
      await console.log(
        "수정 완료: ",
        userId,
        nickname,
        email,
        phone,
        finalImageUrl
      );
    }
  };

  const handleSave = () => {
    // Implement save logic here
    console.log("Save button clicked");
  };

  const handleCancel = () => {
    // Implement cancel logic here
    console.log("Cancel button clicked");
  };

  return (
    <div className={styles.title}>
      <h1>이력서 작성하기</h1>
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
              <div className={styles.overlay}>
                <div className={styles.text}>이미지 편집</div>
              </div>
              {/* Added the additional image */}
            </label>

            <input
              id="profileImage"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
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
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </form>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoName}>
              <h3>관심분야</h3>
              <span className={styles.redColor}> *</span>
            </div>
            <form>
              <input
                placeholder="ex) IT/디자인"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
              />
            </form>
          </div>
        </div>
      </div>

      <div className={styles.baeckjoon}>
        <div className={styles.backjoonItem}>
          <div className={styles.infoName}>
            <h3>백준 티어</h3>
            <span className={styles.redColor}> *</span>
          </div>
          <form>
            <input
              placeholder="백준에서 사용하시는 이메일을 입력해주세요"
              value={baeckjoonId}
              onChange={(e) => setBackjoonId(e.target.value)}
            />
            <button type="button" onClick={handleSave}>
              Save
            </button>
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
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
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
            value={github}
            onChange={(e) => setGithub(e.target.value)}
          />
        </form>
      </div>

      <div className={styles.github}>
        <div className={styles.infoName}>
          <h3>기타 SNS ex.Instagram, Facebook, T-Stroy 등</h3>
          <span className={styles.redColor}>*</span>
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

export default WritePortfolio;
