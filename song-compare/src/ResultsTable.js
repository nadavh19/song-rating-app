// File: src/Styles/ResultsTable.js
import React from "react";
import { motion } from "framer-motion";
import "./Styles/ResultsTable.css";

function ResultsTable({ user, ratings, onReset }) {
  const ratedSongs = ratings.filter(r => r.rating !== null);
  const totalScore = ratedSongs.reduce((sum, r) => sum + r.rating, 0);
  const average = ratedSongs.length > 0
    ? (totalScore / ratedSongs.length).toFixed(2)
    : 'N/A';

  const maxRatedSong = ratedSongs.length > 0
    ? ratedSongs.reduce((a, b) => (a.rating > b.rating ? a : b))
    : null;

  const minRatedSong = ratedSongs.length > 0
    ? ratedSongs.reduce((a, b) => (a.rating < b.rating ? a : b))
    : null;

  return (
    <motion.div
      className="results-bg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <motion.div
        className="results-card shadow p-4"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
      >
        <motion.h2
          className="mb-3 title-results"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Results for {user.userName}
        </motion.h2>

        <motion.div
          className="results-info"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <p><strong>Album:</strong> {user.album}</p>
          <p><strong>Band:</strong> {user.band}</p>
          <p><strong>Total Rating:</strong> {totalScore}</p>
          <p><strong>Average Rating:</strong> {average}</p>

          {minRatedSong && (
            <p>
              <strong>Lowest Rated Song:</strong> {minRatedSong.songName} with a score of {minRatedSong.rating}
            </p>
          )}

          {maxRatedSong && (
            <p>
              <strong>Highest Rated Song:</strong> {maxRatedSong.songName} with a score of {maxRatedSong.rating}
            </p>
          )}
        </motion.div>

        <motion.h4
          className="mt-4 section-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          All Ratings:
        </motion.h4>

        <motion.table
          className="results-table"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Song Name</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {ratings.map((r, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 + i * 0.05 }}
                whileHover={{ scale: 1.02 }}
              >
                <td>{i + 1}</td>
                <td>{r.songName}</td>
                <td>{r.rating === null ? 'Skipped' : r.rating}</td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>

        <motion.button
          className="btn btn-danger mt-4"
          onClick={onReset}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Reset &amp; Start Over
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default ResultsTable;
