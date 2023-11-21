import React, { ChangeEvent } from "react";

interface ProfileImageProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ onChange }) => (
  <label>
    <p style={{ fontWeight: "bold" }}>プロフィール写真</p>
    <input
      type="file"
      accept="image/*"
      onChange={onChange}
      style={{
        width: 300,
        height: 30,
        border: "1px solid gray",
        borderRadius: 5,
        padding: 5,
      }}
    />
  </label>
);

export default ProfileImage;
