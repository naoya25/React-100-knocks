import React, { useState, useRef, ChangeEvent } from "react";
import html2canvas from "html2canvas";
import Input from "./components/Input";
import ProfileImage from "./components/ProfileImage";

interface ProfileState {
  name: string;
  birthday: string;
  phoneNumber: string;
  profileImage: File | null;
  imagePreview: string | null;
}

const ProfileCardGenerator: React.FC = () => {
  const [profile, setProfile] = useState<ProfileState>({
    name: "",
    birthday: "",
    phoneNumber: "",
    profileImage: null,
    imagePreview: null,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({
          ...profile,
          profileImage: file,
          imagePreview: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const targetRef = useRef<HTMLDivElement>(null);
  const handleDownload = () => {
    if (targetRef.current) {
      html2canvas(targetRef.current).then((canvas) => {
        const url = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = url;
        a.download = "myProfile.png";
        a.click();
      });
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>プロフィール自動生成</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: 800,
          margin: "auto",
        }}
      >
        <div
          style={{
            width: 400,
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            boxShadow: "0 0 3px 2px rgba(0, 0, 0, 0.1)",
            paddingTop: 50,
            background: "white",
          }}
          ref={targetRef}
        >
          <p>
            {profile.imagePreview && (
              <div
                id="profile-image"
                style={{
                  margin: "auto",
                  width: 200,
                  height: 200,
                  borderRadius: 100,
                  backgroundImage: `url(${profile.imagePreview})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            )}
          </p>
          <p style={{ fontWeight: "bold", fontSize: "3em" }}>{profile.name}</p>
          <p>誕生日: {profile.birthday}</p>
          <p>電話番号: {profile.phoneNumber}</p>
        </div>
        <div>
          <Input
            label="お名前"
            name="name"
            value={profile.name}
            onChange={handleInputChange}
            width={300}
          />
          <Input
            label="お誕生日"
            name="birthday"
            value={profile.birthday}
            onChange={handleInputChange}
            width={300}
            type="date"
          />
          <Input
            label="電話番号"
            name="phoneNumber"
            value={profile.phoneNumber}
            onChange={handleInputChange}
            width={300}
          />
          <ProfileImage onChange={handleImageChange} />
          <p>
            <button
              onClick={handleDownload}
              style={{
                background: "green",
                border: "none",
                borderRadius: 5,
                width: 310,
                height: 50,
                color: "white",
                outline: "none",
              }}
            >
              Download as PNG
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCardGenerator;
