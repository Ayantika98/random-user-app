import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import UserDisplay from './UserDisplay';

interface UserData {
  name: string;
  email: string;
}

const centerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '90%',
};

const containerStyle: React.CSSProperties = {
  textAlign: 'center',
};

const progressContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const App: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchNewUser = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://randomuser.me/api');
      const userData = response.data.results[0];
      const { name, email } = userData;
      const newUser = { name: `${name.first} ${name.last}`, email };
      setUser(newUser);
      localStorage.setItem('userData', JSON.stringify(newUser));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const userDataFromStorage = localStorage.getItem('userData');
    if (userDataFromStorage) {
      setUser(JSON.parse(userDataFromStorage));
    } else {
      fetchNewUser();
    }
  }, [fetchNewUser]);

  return (
    <div style={centerStyle}>
      <div style={containerStyle}>
        <h1>Random User Information</h1>
        {loading ? (
          <div style={progressContainerStyle}>
            <CircularProgress />
          </div>
        )
          :
          <UserDisplay user={user} loading={loading} refreshUser={fetchNewUser} />
        }
      </div>
    </div>
  );
};

export default App;
