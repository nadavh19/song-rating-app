import React from 'react';
import '../Styles/GroupResultsSummary.css';
import {
  FadeInUp,
  FadeIn,
  AnimatedButton
} from './Animators/AnimatedWrappers';

function GroupResultsSummary({ userGroup, sharedAlbumName, sharedBandName, onReset, setStep }) {
  const getStats = (ratings) => {
    const rated = ratings.filter(r => r.rating !== null);
    if (rated.length === 0) return {
      total: 0,
      avg: 'N/A',
      min: null,
      max: null
    };

    const total = rated.reduce((sum, r) => sum + r.rating, 0);
    const avg = (total / rated.length).toFixed(2);
    const min = rated.reduce((a, b) => a.rating < b.rating ? a : b);
    const max = rated.reduce((a, b) => a.rating > b.rating ? a : b);
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
