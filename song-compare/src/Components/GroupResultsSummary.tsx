import React from 'react';
import '../Styles/GroupResultsSummary.css';
import {
  FadeInUp,
  FadeIn,
  AnimatedButton
} from './Animators/AnimatedWrappers';

// 🧠 Define what a single song rating looks like
type Rating = {
  songName: string;
  rating: number | null;
};

// 🧠 Define what a single user looks like
type User = {
  userName: string;
  albumName: string;
  bandName: string;
};

// 🧠 Each user in the group has a user object + a list of song ratings
type UserGroupEntry = {
  user: User;
  ratings: Rating[];
};

// 🧠 Props passed into this component
type GroupResultsSummaryProps = {
  userGroup: UserGroupEntry[];
  sharedAlbumName: string;
  sharedBandName: string;
  sharedSongList?: string[];
  onReset: () => void;
  setStep: (step: number) => void;
};

function GroupResultsSummary({
  userGroup,
  sharedAlbumName,
  sharedBandName,
  onReset,
  setStep,
}: GroupResultsSummaryProps) {
  // 🧠 This helper function takes a list of ratings and gives back stats
  const getStats = (ratings: Rating[]) => {
    // Keep only songs that were rated (not skipped)
    const rated = ratings.filter(r => r.rating !== null);

    // If the user didn’t rate anything, return default values
    if (rated.length === 0) return {
      total: 0,
      avg: 'N/A',
      min: null,
      max: null
    };

    // Add all the rating numbers together
    const total = rated.reduce((sum, r) => sum + (r.rating ?? 0), 0);

    // Divide total by how many songs were rated (and round to 2 decimals)
    const avg = (total / rated.length).toFixed(2);

    // Find the lowest-rated song
    const min = rated.reduce((a, b) => (a.rating! < b.rating! ? a : b));

    // Find the highest-rated song
    const max = rated.reduce((a, b) => (a.rating! > b.rating! ? a : b));

    // Return an object with stats
    return { total, avg, min, max };
  };

  return (
    <div className="groupresults-bg d-flex align-items-center justify-content-center">
      <FadeInUp className="groupresults-card shadow p-4">
        <FadeIn className="text-center title-music mb-4">
          <h2>📊 Group Results Summary</h2>
        </FadeIn>

        <div className="table-responsive">
          <table className="table table-bordered table-hover text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th>User</th>
                <th>Album</th>
                <th>Band</th>
                <th>Total</th>
                <th>Average</th>
                <th>Lowest</th>
                <th>Highest</th>
              </tr>
            </thead>
            <tbody>
              {userGroup.map((entry, index) => {
                const stats = getStats(entry.ratings);
                return (
                  <tr key={index}>
                    <td>{entry.user.userName}</td>
                    <td>{sharedAlbumName}</td>
                    <td>{sharedBandName}</td>
                    <td>{stats.total}</td>
                    <td>{stats.avg}</td>
                    <td>{stats.min ? `${stats.min.songName} (${stats.min.rating})` : 'N/A'}</td>
                    <td>{stats.max ? `${stats.max.songName} (${stats.max.rating})` : 'N/A'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-between mt-4">
          <AnimatedButton className="btn btn-purple" onClick={onReset}>
            🔁 Start Over
          </AnimatedButton>
          <AnimatedButton className="btn btn-dark" onClick={() => setStep(4)}>
            🔍 View Song-by-Song Comparison
          </AnimatedButton>
        </div>
      </FadeInUp>
    </div>
  );
}

export default GroupResultsSummary;
