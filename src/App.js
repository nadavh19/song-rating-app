import React, { useState } from 'react';
import UserForm from './Components/UserForm';
import SongRatingScreen from './Components/SongRatingScreen';
import AddAnotherUserScreen from './Components/AddAnotherUserScreen';
import GroupResultsSummary from './Components/GroupResultsSummary';
import SongComparisonTable from './Components/SongComparisonTable';

function App() {
  // App-wide states
  const [step, setStep] = useState(0); // Step 0: form, 1: rating, 2: add another, 3: summary, 4: comparison
  const [userGroup, setUserGroup] = useState([]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);

  // Shared album info from first user
  const [sharedAlbumName, setSharedAlbumName] = useState('');
  const [sharedBandName, setSharedBandName] = useState('');

  // Before submitting the form, we check:
  const isFirstUserBeingAdded = userGroup.length === 0;


  // Step 0: After user fills form
  const handleUserSubmit = (userData) => {
    // If this is the first user, store album and band globally
    if (isFirstUserBeingAdded) {
      setSharedAlbumName(userData.albumName);
      setSharedBandName(userData.bandName);
    }


    const newEntry = {
      user: {
        userName: userData.userName,
        albumName: sharedAlbumName || userData.albumName,
        bandName: sharedBandName || userData.bandName
      },
      ratings: []
    };
    setUserGroup((prev) => [...prev, newEntry]);
    setCurrentUserIndex(userGroup.length); // index of newly added user
    setStep(1); // go to rating screen
  };

  // Step 1: After user finishes rating
  const handleRatingsFinish = (ratingsList) => {
    const updatedGroup = [...userGroup];
    updatedGroup[currentUserIndex].ratings = ratingsList;
    setUserGroup(updatedGroup);
    setStep(2); // go to "add another user" screen
  };

  // Step 2: After user chooses to finish or add another
  const handleFinishGroup = () => {
    setStep(3); // show results summary
  };

  // Restart the app
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
          onBack={() => setStep(3)}
        />
      )}
    </div>
  );
}

export default App;
