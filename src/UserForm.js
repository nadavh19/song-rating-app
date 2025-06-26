import React from "react";
import { motion } from "framer-motion";
import './Styles/UserForm.css';
 

function UserForm({ onSubmit }) {
  const [userData, setUserData] = React.useState({
    userName: '',
    album: '',
    band: ''
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    onSubmit(userData);
  };

  return (
    <div className="userform-bg">
      <motion.div
        className="userform-card card shadow-lg p-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="text-center mb-4 title-music"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          🎵 Start Rating
        </motion.h2>

        {/* Name Input */}
        <motion.div
          className="mb-3"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <label className="form-label">Your Name</label>
          <input
            name="userName"
            className="form-control"
            placeholder="Enter your name"
            value={userData.userName}
            onChange={handleChange}
          />
        </motion.div>

        {/* Album Input */}
        {userData.userName.trim() !== '' && (
          <motion.div
            className="mb-3"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="form-label">Album Name</label>
            <input
              name="album"
              className="form-control"
              placeholder="Enter album name"
              value={userData.album}
              onChange={handleChange}
            />
          </motion.div>
        )}

        {/* Band Input */}
        {userData.album.trim() !== '' && (
          <motion.div
            className="mb-3"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="form-label">Band Name</label>
            <input
              name="band"
              className="form-control"
              placeholder="Enter band name"
              value={userData.band}
              onChange={handleChange}
            />
          </motion.div>
        )}

        {/* Submit Button */}
        {userData.band.trim() !== '' && (
          <motion.button
            className="btn btn-purple w-100 mt-3"
            onClick={handleSubmit}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            Start Rating
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}

export default UserForm;
