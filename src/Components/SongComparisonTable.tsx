import React from 'react';
import '../Styles/SongComparisonTable.css';
import * as MotionWrap from './Animators/AnimatedWrappers';

// 🧠 A single rating: song name + number or null (if skipped)
type Rating = {
  songName: string ;
  rating: number | null;
};

// 🧠 Each user object includes their name, album, band
type User = {
  userName: string;
  albumName: string;
  bandName: string;
};

// 🧠 Full data per user = user + their list of ratings
type UserGroupEntry = {
  user: User;
  ratings: Rating[];
};

// 🧠 Props the component receives
type SongComparisonTableProps = {
  userGroup: UserGroupEntry[];
  onBack: () => void;
};

function SongComparisonTable({ userGroup, onBack }: SongComparisonTableProps) {
  // Step 1: Collect all unique song names from all users
  const allSongNames = new Set<string>();
  userGroup.forEach(({ ratings }) => {
    ratings.forEach(({ songName }) => {
      if (songName && songName.trim() !== '') {
        allSongNames.add(songName.trim());
      }
    });
  });

  const uniqueSongs = Array.from(allSongNames);

  return (
    <MotionWrap.FadeIn className="comparison-bg">
      <MotionWrap.FadeInScale className="comparison-card shadow p-4">
        <h2 className="text-center title-music mb-4">🎵 Song-by-Song Ratings</h2>

        <div className="table-responsive">
          <table className="table table-bordered table-hover text-center">
            <thead className="table-dark">
              <tr>
                <th>Song</th>
                {userGroup.map((u, i) => (
                  <th key={i}>{u.user.userName}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {uniqueSongs.map((song, i) => (
                <tr key={i}>
                  <td>{song}</td>
                  {userGroup.map((u, j) => {
                    const entry = u.ratings.find(r => r.songName.trim() === song);
                    return (
                      <td key={j}>
                        {entry
                          ? entry.rating === null
                            ? 'Skipped'
                            : `⭐ ${entry.rating}`
                          : '—'}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <MotionWrap.AnimatedButton
          className="btn btn-purple mt-4"
          onClick={onBack}
        >
          ← Back to Summary
        </MotionWrap.AnimatedButton>
      </MotionWrap.FadeInScale>
    </MotionWrap.FadeIn>
  );
}

export default SongComparisonTable;
