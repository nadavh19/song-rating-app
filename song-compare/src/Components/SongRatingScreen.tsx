import React, { useState, ChangeEvent, useEffect,useCallback } from 'react';
import '../Styles/SongRatingScreen.css';
import * as MotionWrap from './Animators/AnimatedWrappers';

type SongRatingScreenProps = {
  userName: string;
  albumName: string;
  bandName: string;
  songs: string[];
  onFinish: (ratings: Rating[]) => void;
};

type Rating = {
  songName: string;
  rating: number | null;
};

function SongRatingScreen({
  userName,
  albumName,
  bandName,
  songs,
  onFinish,
}: SongRatingScreenProps) {
  const [ratingsList, setRatingsList] = useState<Rating[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rating, setRating] = useState('');

  const currentSong = songs[currentIndex];
  const ratingPattern = /^[1-9]$|^10$/;
  const isValidRating = ratingPattern.test(rating);

  

  const handleAddRating = () => {
    const ratingValue = rating === '' ? null : parseInt(rating, 10);
    setRatingsList([...ratingsList, { songName: currentSong, rating: ratingValue }]);
    setRating('');
    setCurrentIndex(currentIndex + 1);
  };

  const handleSkip = () => {
    setRatingsList([...ratingsList, { songName: currentSong, rating: null }]);
    setRating('');
    setCurrentIndex(currentIndex + 1);
  };

  const handleFinish = useCallback(() => {
  const remaining = songs.slice(currentIndex).map(song => ({
    songName: song,
    rating: null,
  }));
  const fullRatings = [...ratingsList, ...remaining];
  onFinish(fullRatings);
}, [currentIndex, songs, ratingsList, onFinish]);

useEffect(() => {
  if (currentIndex >= songs.length) {
    handleFinish();
  }
}, [currentIndex, handleFinish,songs.length]);


  return (
    <MotionWrap.FadeInUp className="rating-bg">
      <MotionWrap.FadeInScale className="rating-card shadow p-4">
        <MotionWrap.FadeInText className="text-center title-music mb-4" delay={0.2}>
          <h2>
            🎶 {userName}, rate the song <strong>{songs[currentIndex]}</strong> by <strong>{bandName}</strong>
          </h2>
          <p className="text-muted">Album: {albumName}</p>
        </MotionWrap.FadeInText>

        {currentIndex < songs.length && (
          <>
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
                disabled={!isValidRating}
              >
                Add Rating
              </MotionWrap.AnimatedButton>
              <MotionWrap.AnimatedButton
                className="btn btn-dark flex-fill"
                onClick={handleSkip}
              >
                Skip Song
              </MotionWrap.AnimatedButton>
            </MotionWrap.FadeInUp>
          </>
        )}

        <MotionWrap.FadeInUp className="mb-3" delay={0.55}>
          <MotionWrap.AnimatedButton
            className="btn btn-purple w-100"
            onClick={handleFinish}
          >
            Finish Rating (Skip Remaining)
          </MotionWrap.AnimatedButton>
        </MotionWrap.FadeInUp>

        <hr />

        <MotionWrap.FadeInText className="mb-3" delay={0.6}>
          <h5>🎧 Your Ratings So Far:</h5>
        </MotionWrap.FadeInText>

        <div className="row g-3">
          {ratingsList.map((r, i) => (
            <MotionWrap.StaggeredFadeTile
              key={i}
              delay={0.1}
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
