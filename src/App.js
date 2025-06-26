import React, { useState } from 'react';
import UserForm from './UserForm';
import SongRatingScreen from './SongRatingScreen';
import AddAnotherUserScreen from './AddAnotherUserScreen';
import GroupResultsSummary from './GroupResultsSummary';
import SongComparisonTable from './SongComparisonTable';

function App() {
  // App-wide states
  const [step, setStep] = useState(0); // Step 0: form, 1: rating, 2: add another, 3: summary, 4: comparison
  const [userGroup, setUserGroup] = useState([]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);

  // Step 0: After user fills form
  const handleUserSubmit = (userData) => {
    const newEntry = { user: userData, ratings: [] };
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
    setStep(0);
  };

  return (
    <div className="app-container">
      {step === 0 && (
        <UserForm onSubmit={handleUserSubmit} />
      )}
      {step === 1 && (
        <SongRatingScreen
          user={userGroup[currentUserIndex].user}
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
          onReset={handleReset}
          setStep={setStep} // to allow moving to comparison
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
