import React, { useState } from 'react';
import UserForm from './Components/UserForm';
import SongRatingScreen from './Components/SongRatingScreen';
import AddAnotherUserScreen from './Components/AddAnotherUserScreen';
import GroupResultsSummary from './Components/GroupResultsSummary';
import SongComparisonTable from './Components/SongComparisonTable';

// === Type Definitions ===
type Rating = {
  songName: string;
  rating: number | null;
};

type User = {
  userName: string;
  albumName: string;
  bandName: string;
};

type UserGroupEntry = {
  user: User;
  ratings: Rating[];
};

type UserFormData = {
  userName: string;
  albumName: string;
  bandName: string;
  songs:string[];
};

function App() {
  const [step, setStep] = useState<number>(0);
  const [userGroup, setUserGroup] = useState<UserGroupEntry[]>([]);
  const [currentUserIndex, setCurrentUserIndex] = useState<number>(0);
  const [sharedAlbumName, setSharedAlbumName] = useState<string>('');
  const [sharedBandName, setSharedBandName] = useState<string>('');
  const [songList, setSongList] = useState<string[]>([]); 


  const isFirstUserBeingAdded = userGroup.length === 0;

  const handleUserSubmit = (userData: UserFormData) => {
    if (isFirstUserBeingAdded) {
      setSharedAlbumName(userData.albumName);
      setSharedBandName(userData.bandName);
      setSongList(userData.songs);
    }

    const newEntry: UserGroupEntry = {
      user: {
        userName: userData.userName,
        albumName: sharedAlbumName || userData.albumName,
        bandName: sharedBandName || userData.bandName,
      },
      ratings: [],
    };

    setUserGroup((prev) => [...prev, newEntry]);
    setCurrentUserIndex(userGroup.length);
    setStep(1);
  };

  const handleRatingsFinish = (ratingsList: Rating[]) => {
    const updatedGroup = [...userGroup];
    updatedGroup[currentUserIndex].ratings = ratingsList;
    setUserGroup(updatedGroup);
    setStep(2);
  };

  const handleFinishGroup = () => {
    setStep(3);
  };

  const handleReset = () => {
    setUserGroup([]);
    setCurrentUserIndex(0);
    setSharedAlbumName('');
    setSharedBandName('');
    setStep(0);
  };

  return (
    <div className="app-container">
      {step === 0 && (
        <UserForm
          onSubmit={handleUserSubmit}
          isFirstUserBeingAdded={isFirstUserBeingAdded}
          sharedAlbumName={sharedAlbumName}
          sharedBandName={sharedBandName}
        />
      )}

      {step === 1 && (
        <SongRatingScreen
          userName={userGroup[currentUserIndex].user.userName}
          albumName={sharedAlbumName}
          bandName={sharedBandName}
          songs = {songList}
          onFinish={handleRatingsFinish}
        />
      )}

      {step === 2 && (
        <AddAnotherUserScreen
          onAddAnother={() => setStep(0)}
          onFinishGroup={handleFinishGroup}
        />
      )}

      {step === 3 && (
        <GroupResultsSummary
          userGroup={userGroup}
          sharedAlbumName={sharedAlbumName}
          sharedBandName={sharedBandName}
          onReset={handleReset}
          setStep={setStep}
        />
      )}

      {step === 4 && (
        <SongComparisonTable
          userGroup={userGroup}
          sharedSongList = {songList}
          onBack={() => setStep(3)}
        />
      )}
    </div>
  );
}

export default App;
