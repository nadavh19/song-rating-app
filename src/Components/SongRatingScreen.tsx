import React, { useState, ChangeEvent } from 'react';
import '../Styles/SongRatingScreen.css';
import * as MotionWrap from './Animators/AnimatedWrappers';

// ✅ 1. Define the types of the component props
type SongRatingScreenProps = {
  userName: string;
  albumName: string;
  bandName: string;
  onFinish: (ratings: Rating[]) => void;
};

// ✅ 2. Define the type of a single rating entry
type Rating = {
  songName: string;
  rating: number | null;
};

function SongRatingScreen({
  userName,
  albumName,
  bandName,
  onFinish,
}: SongRatingScreenProps) {
  // ✅ 3. Type local state: we rely on inference where possible
  const [songName, setSongName] = useState('');
  const [rating, setRating] = useState('');
  const [ratingsList, setRatingsList] = useState<Rating[]>([]); // explicitly say it's a list of Rating objects

  // ✅ 4. Add rating to list
  const handleAddRating = () => {
    const ratingValue = rating === '' ? null : parseInt(rating, 10);
    setRatingsList([...ratingsList, { songName, rating: ratingValue }]);
    setSongName('');
    setRating('');
  };

  // ✅ 5. Skip a song (rating is null)
  const handleSkip = () => {
    setRatingsList([...ratingsList, { songName, rating: null }]);
    setSongName('');
    setRating('');
  };

  // ✅ 6. Finish the session and return the ratings
  const handleFinish = () => {
    onFinish(ratingsList);
  };

  // ✅ 7. Input validation pattern (no need to type regex)
  const ratingPattern = /^[1-9]$|^10$/;
  const isValidRating = ratingPattern.test(rating);

  return (
    <MotionWrap.FadeInUp className="rating-bg">
      <MotionWrap.FadeInScale className="rating-card shadow p-4">
        <MotionWrap.FadeInText className="text-center title-music mb-4" delay={0.2}>
          <h2>
            🎶 {userName}, rate songs for <strong>{albumName}</strong> by <strong>{bandName}</strong>
          </h2>
        </MotionWrap.FadeInText>

        {/* ✅ Typed input change events */}
        <MotionWrap.FadeInXLeft className="mb-3" delay={0.3}>
          <label className="form-label">Song Name</label>
          <input
            className="form-control"
            placeholder="Enter song name"
            value={songName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSongName(e.target.value)}
          />
        </MotionWrap.FadeInXLeft>

        <MotionWrap.FadeInRight className="mb-3" delay={0.4}>
          <label className="form-label">Rating (1-10) or press skip</label>
          <input
            className="form-control"
            type="number"
            min="1"
            max="10"
            step="1"
            placeholder="Rating"
            value={rating}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setRating(e.target.value)}
          />
        </MotionWrap.FadeInRight>

        <MotionWrap.FadeInUp className="d-flex gap-2 mb-3" delay={0.5}>
          <MotionWrap.AnimatedButton
            className="btn btn-purple flex-fill"
            onClick={handleAddRating}
            disabled={songName.trim() === '' || !isValidRating}
          >
            Add Rating
          </MotionWrap.AnimatedButton>
          <MotionWrap.AnimatedButton
            className="btn btn-dark flex-fill"
            onClick={handleSkip}
            disabled={songName.trim() === ''}
          >
            Skip Song
          </MotionWrap.AnimatedButton>
        </MotionWrap.FadeInUp>

        <hr />

        <MotionWrap.AnimatedButtonScaleIn
          className="btn btn-purple w-100 mb-4"
          onClick={handleFinish}
          delay={0.2}
        >
          Finish Rating
        </MotionWrap.AnimatedButtonScaleIn>

        <MotionWrap.FadeInText className="mb-3" delay={0.7}>
          <h5><span role="img" aria-label="headphones">🎧</span> Your Ratings:</h5>
        </MotionWrap.FadeInText>

        <div className="row g-3">
          {ratingsList.map((r, i) => (
            <MotionWrap.StaggeredFadeTile
              key={i}
              delay={i * 0.1}
              className="col-6 col-md-4"
            >
              <div className={`rating-card-tile p-3 rounded text-center ${r.rating === null ? 'skipped' : 'rated'}`}>
                <div className="fw-bold text-truncate">{r.songName}</div>
                <div className="mt-2">
                  {r.rating === null ? '🎵 Skipped' : `⭐ ${r.rating}`}
                </div>
              </div>
            </MotionWrap.StaggeredFadeTile>
          ))}
        </div>
      </MotionWrap.FadeInScale>
    </MotionWrap.FadeInUp>
  );
}

export default SongRatingScreen;
