import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Styles/SongRatingScreen.css';

function SongRatingScreen({ userName, albumName, bandName, onFinish }) {
  const [songName, setSongName] = useState('');
  const [rating, setRating] = useState('');
  const [ratingsList, setRatingsList] = useState([]);

  const handleAddRating = () => {
    const ratingValue = rating === '' ? null : parseInt(rating, 10);
    setRatingsList([...ratingsList, { songName, rating: ratingValue }]);
    setSongName('');
    setRating('');
  };

  const handleSkip = () => {
    setRatingsList([...ratingsList, { songName, rating: null }]);
    setSongName('');
    setRating('');
  };

  const handleFinish = () => {
    onFinish(ratingsList);
  };

  const ratingPattern = /^[1-9]$|^10$/;
  const isValidRating = ratingPattern.test(rating);

  return (
    <motion.div
      className="rating-bg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="rating-card shadow p-4"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 120 }}
      >
        <motion.h2
          className="text-center title-music mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          🎶 {userName}, rate songs for <strong>{albumName}</strong> by <strong>{bandName}</strong>
        </motion.h2>

        <motion.div
          className="mb-3"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="form-label">Song Name</label>
          <input
            className="form-control"
            placeholder="Enter song name"
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
          />
        </motion.div>

        <motion.div
          className="mb-3"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label className="form-label">Rating (1-10) or press skip</label>
          <input
            className="form-control"
            type="number"
            min="1"
            max="10"
            step="1"
            placeholder="Rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </motion.div>

        <motion.div
          className="d-flex gap-2 mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            className="btn btn-purple flex-fill"
            onClick={handleAddRating}
            disabled={songName.trim() === '' || !isValidRating}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            Add Rating
          </motion.button>
          <motion.button
            className="btn btn-dark flex-fill"
            onClick={handleSkip}
            disabled={songName.trim() === ''}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            Skip Song
          </motion.button>
        </motion.div>

        <hr />

        <motion.button
          className="btn btn-purple w-100 mb-4"
          onClick={handleFinish}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Finish Rating
        </motion.button>

        <motion.h5
          className="mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <span role="img" aria-label="headphones">🎧</span> Your Ratings:
        </motion.h5>

        <div className="row g-3">
          {ratingsList.map((r, i) => (
            <motion.div
              key={i}
              className="col-6 col-md-4"
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className={`rating-card-tile p-3 rounded text-center ${r.rating === null ? 'skipped' : 'rated'}`}>
                <div className="fw-bold text-truncate">{r.songName}</div>
                <div className="mt-2">
                  {r.rating === null ? '🎵 Skipped' : `⭐ ${r.rating}`}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default SongRatingScreen;
