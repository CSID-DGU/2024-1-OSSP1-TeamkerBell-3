import React, { useState } from "react";
import AWS from "aws-sdk";

const BtnUpload = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const uploadS3 = async (file) => {
    const REGION = process.env.REACT_APP_REGION;
    const ACCESS_KEY_ID = process.env.REACT_APP_ACCESS_KEY_ID;
    const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY;
    const BUCKET_NAME = "teamkerbellbucket";

    console.log("Region:", REGION);
    console.log("Access Key ID:", ACCESS_KEY_ID);
    console.log("Secret Access Key:", SECRET_ACCESS_KEY);
    console.log("Bucket Name:", BUCKET_NAME);

    AWS.config.update({
      region: REGION,
      accessKeyId: ACCESS_KEY_ID,
      secretAccessKey: SECRET_ACCESS_KEY,
    });

    const upload = new AWS.S3.ManagedUpload({
      params: {
        ACL: "public-read",
        Bucket: BUCKET_NAME,
        Key: `teamkerbell/${file.name}`,
        Body: file,
        ContentType: file.type,
      },
    });

    try {
      const data = await upload.promise();
      console.log("Upload successful:", data);
      return data.Location;
    } catch (err) {
      console.error("Upload failed:", err);
      throw err;
    }
  };

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
    if (!imageFile) {
      alert("이미지를 선택해주세요!");
      return;
    }

    setIsUploading(true);

    try {
      const imageUrl = await uploadS3(imageFile);
      setImageUrl(imageUrl);
    } catch (error) {
      console.error("[S3 Upload Error]:", error);
      alert("S3 업로드 에러가 났습니다! 다시 시도해주세요!");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {imageSrc && <img src={imageSrc} alt="preview" />}
      <button type="button" onClick={handleSubmit} disabled={isUploading}>
        {isUploading ? "Uploading..." : "Upload!"}
      </button>
      {imageUrl && <img src={imageUrl} alt="uploaded" />}
      {/* Added the additional image */}
      <img
        src="https://teamkerbellbucket.s3.ap-northeast-2.amazonaws.com/teamkerbell/dice.jpg"
        alt="additional"
      />
    </div>
  );
};

export default BtnUpload;
