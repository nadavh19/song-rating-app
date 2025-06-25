

import React, { useState } from 'react';
import UserForm from './UserForm';
import SongRatingScreen from './SongRatingScreen'
import ResultsTable from './ResultsTable';

function App() {

  //States
  const [currentUserData, setCurrentUserData] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [isRatingDone, setIsRatingDone] = useState(false);

  const handleUserSubmit = (data) => {
    setCurrentUserData(data)
    console.log('user submitted: ', data); // later: move to rating screen 
  };
  const handleRatingsFinish = (ratingsList) => {
    setRatings(ratingsList);
    setIsRatingDone(true);
  };
  const handleReset = () => {
    setCurrentUserData(null);
    setRatings([]);
    setIsRatingDone(false);
  };


  return (
    <div>
      {!currentUserData ? (
        <UserForm onSubmit={handleUserSubmit} />
      ) : !isRatingDone ? (
        <SongRatingScreen user={currentUserData} onFinish={handleRatingsFinish} />
      ) : (
        <ResultsTable user={currentUserData} ratings={ratings} onReset={handleReset} />

      )}
    </div>
  );
}

export default App;



