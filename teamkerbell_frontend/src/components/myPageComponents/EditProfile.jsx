// src/team.js
import React, { useState, useEffect } from "react";
import styles from "./EditProfile.module.css";
import { uploadS3 } from "../../utils/uploadS3";
import { patchUserProfile } from "../../api/user";
import { useParams } from "react-router-dom";

const EditProfile = ({ data }) => {
  const { userId } = useParams();
  const [nickname, setNickname] = useState(data.nickname || ""); // data.nickname을 초기값으로 설정
  const [email, setEmail] = useState(data.email || ""); // data.email을 초기값으로 설정
  const [phone, setPhone] = useState(data.phone || ""); // data.phoneNumber을 초기값으로 설정
  const [imageFile, setImageFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(data.img || null); // data.img를 초기값으로 설정
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // useEffect를 사용하여 data 변경 시 컴포넌트 상태 업데이트
  useEffect(() => {
    setNickname(data.nickname || "");
    setEmail(data.email || "");
    setPhone(data.phone || "");
    setImageSrc(data.img || null);
    console.log("[UseEffect] :", nickname, email, phone, imageSrc);
  }, [data]); // data 추가

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
      await patchUserProfile(userId, nickname, email, phone, finalImageUrl);
    }
  };

  return (
    <div className={styles.title}>
      <h1>프로필 편집</h1>
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
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
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
        </div>
      </div>

      <div className={styles.editprofilebuttons}>
        <button className={styles.editprofileCancleButton}>Cancle</button>
        <button className={styles.editprofileSaveButton} onClick={handleSubmit}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
