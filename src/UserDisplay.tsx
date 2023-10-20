// UserDisplay.tsx (Child Component)
import React from 'react';
import { CircularProgress } from '@mui/material';

interface UserDisplayProps {
  user: { name: string; email: string } | null;
  loading: boolean;
  refreshUser: () => void;
}

const UserDisplay: React.FC<UserDisplayProps> = ({ user, loading, refreshUser }) => {
  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        user && (
          <div>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        )
      )}
      <button onClick={refreshUser}>Refresh</button>
    </div>
  );
};

export default UserDisplay;
