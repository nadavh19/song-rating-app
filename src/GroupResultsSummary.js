import React from 'react';
import { motion } from 'framer-motion';
import './Styles/GroupResultsSummary.css';

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
      <motion.div
        className="groupresults-card shadow p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-center title-music mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          📊 Group Results Summary
        </motion.h2>

        <div className="table-responsive">
          <table className="table table-bordered table-striped align-middle">
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
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <td>{entry.user.userName}</td>
                    <td>{sharedAlbumName}</td>
                    <td>{sharedBandName}</td>
                    <td>{stats.total}</td>
                    <td>{stats.avg}</td>
                    <td>
                      {stats.min ? `${stats.min.songName} (${stats.min.rating})` : 'N/A'}
                    </td>
                    <td>
                      {stats.max ? `${stats.max.songName} (${stats.max.rating})` : 'N/A'}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-between mt-4">
          <motion.button
            className="btn btn-purple"
            onClick={onReset}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🔁 Start Over
          </motion.button>
          <motion.button
            className="btn btn-dark"
            onClick={() => setStep(4)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🔍 View Song-by-Song Comparison
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default GroupResultsSummary;
