import React from 'react';
import '../Styles/SongComparisonTable.css';
import * as MotionWrap from './Animators/AnimatedWrappers';

type Rating = {
  songName: string;
  rating: number | null;
};

type User = {
  userName: string;
  albumName: string;
  bandName: string;
};

type UserGroupEntry = {
  user: User;
  ratings: Rating[];
};

type SongComparisonTableProps = {
  userGroup: UserGroupEntry[];
  sharedSongList: string[]; // ✅ NEW: full song order
  onBack: () => void;
};

function SongComparisonTable({ userGroup, sharedSongList, onBack }: SongComparisonTableProps) {
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
              {sharedSongList.map((song, i) => (
                <tr key={i}>
                  <td>{song}</td>
                  {userGroup.map((u, j) => {
                    const entry = u.ratings.find(r => r.songName.trim() === song.trim());
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
