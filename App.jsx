import React from 'react';
import { useState, useEffect } from 'react';
import ProfileForm from './ProfileForm.jsx';
import Dashboard from './components/Dashboard.jsx';

function App() {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem('fitcoreUserProfile');
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }
  }, []);

  const handleProfileSubmit = (profileData) => {
    setUserProfile(profileData);
    localStorage.setItem('fitcoreUserProfile', JSON.stringify(profileData));
  };

  const handleResetProfile = () => {
    setUserProfile(null);
    localStorage.removeItem('fitcoreUserProfile');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {userProfile ? (
        <Dashboard userProfile={userProfile} onReset={handleResetProfile} />
      ) : (
        <ProfileForm onSubmit={handleProfileSubmit} />
      )}
    </div>
  );
}

export default App;

