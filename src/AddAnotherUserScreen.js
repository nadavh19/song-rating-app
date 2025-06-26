// File: src/AddAnotherUserScreen.js
import React from 'react';
import { motion } from 'framer-motion';
import './Styles/AddAnotherUserScreen.css';

function AddAnotherUserScreen({ onAddAnother, onFinishGroup }) {
  return (
    <div className="adduser-bg d-flex align-items-center justify-content-center">
      <motion.div
        className="adduser-card shadow p-4 text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="title-music mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Add Another User?
        </motion.h2>

        <p className="mb-4">
          Would you like to add another person to rate this album, or see the group results?
        </p>

        <div className="d-flex gap-3 justify-content-center">
          <motion.button
            className="btn btn-purple"
            onClick={onAddAnother}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            + Add Another
          </motion.button>
          <motion.button
            className="btn btn-dark"
            onClick={onFinishGroup}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            📊 View Results
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default AddAnotherUserScreen;
