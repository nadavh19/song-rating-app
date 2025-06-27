// File: src/AddAnotherUserScreen.js
import React from 'react';
import '../Styles/AddAnotherUserScreen.css';
import * as MotionWrap from './Animators/AnimatedWrappers';

function AddAnotherUserScreen({ onAddAnother, onFinishGroup }) {
  return (
    <div className="adduser-bg d-flex align-items-center justify-content-center">
      <MotionWrap.FadeInScale className="adduser-card shadow p-4 text-center">
        <MotionWrap.FadeInUp className="title-music mb-4" delay={0.2}>
          <h2>Add Another User?</h2>
        </MotionWrap.FadeInUp>

        <p className="mb-4">
          Would you like to add another person to rate this album, or see the group results?
        </p>

        <div className="d-flex gap-3 justify-content-center">
          <MotionWrap.AnimatedButton
            className="btn btn-purple"
            onClick={onAddAnother}
          >
            + Add Another
          </MotionWrap.AnimatedButton>
          <MotionWrap.AnimatedButton
            className="btn btn-dark"
            onClick={onFinishGroup}
          >
            📊 View Results
          </MotionWrap.AnimatedButton>
        </div>
      </MotionWrap.FadeInScale>
    </div>
  );
}

export default AddAnotherUserScreen;
