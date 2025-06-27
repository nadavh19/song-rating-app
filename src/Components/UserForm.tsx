import React, { useState, ChangeEvent } from "react";
import '../Styles/UserForm.css';
import {
  FadeInDrop,
  FadeInXLeft,
  FadeInText,
  AnimatedButton
} from './Animators/AnimatedWrappers';

// === Props Type ===
type UserFormProps = {
  onSubmit: (data: {
    userName: string;
    albumName: string;
    bandName: string;
  }) => void;
  isFirstUserBeingAdded: boolean;
  sharedAlbumName: string;
  sharedBandName: string;
};
///////////////////////

function UserForm({
  onSubmit,
  isFirstUserBeingAdded,
  sharedAlbumName,
  sharedBandName
}: UserFormProps) {
  const [userData, setUserData] = useState({
    userName: '',
    album: '',
    band: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    const album = isFirstUserBeingAdded ? userData.album : sharedAlbumName;
    const band = isFirstUserBeingAdded ? userData.band : sharedBandName;

    onSubmit({
      userName: userData.userName.trim(),
      albumName: album.trim(),
      bandName: band.trim()
    });
  };

  const nameFilled = userData.userName.trim() !== '';
  const albumFilled = userData.album.trim() !== '';
  const bandFilled = userData.band.trim() !== '';

  return (
    <div className="userform-bg">
      <FadeInDrop className="userform-card card shadow-lg p-4">
        <FadeInText className="text-center mb-4 title-music">
          <h2>🎵 Start Rating</h2>
        </FadeInText>

        {/* Name Input */}
        <FadeInXLeft className="mb-3" delay={0.6}>
          <label className="form-label">Your Name</label>
          <input
            name="userName"
            className="form-control"
            placeholder="Enter your name"
            value={userData.userName}
            onChange={handleChange}
          />
        </FadeInXLeft>

        {/* Album Input (only for first user) */}
        {isFirstUserBeingAdded && nameFilled && (
          <FadeInXLeft className="mb-3" delay={0.2}>
            <label className="form-label">Album Name</label>
            <input
              name="album"
              className="form-control"
              placeholder="Enter album name"
              value={userData.album}
              onChange={handleChange}
            />
          </FadeInXLeft>
        )}

        {/* Band Input (only for first user) */}
        {isFirstUserBeingAdded && albumFilled && (
          <FadeInXLeft className="mb-3" delay={0.2}>
            <label className="form-label">Band Name</label>
            <input
              name="band"
              className="form-control"
              placeholder="Enter band name"
              value={userData.band}
              onChange={handleChange}
            />
          </FadeInXLeft>
        )}

        {(isFirstUserBeingAdded
          ? nameFilled && albumFilled && bandFilled
          : nameFilled) && (
          <AnimatedButton
            className="btn btn-purple w-100 mt-3"
            onClick={handleSubmit}
          >
            Start Rating
          </AnimatedButton>
        )}
      </FadeInDrop>
    </div>
  );
}

export default UserForm;
