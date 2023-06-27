import React, { useState } from 'react';
import './AuthPage.css';
import SignUpForm from '../../Components/AuthForm/SignUpForm';
import LogInForm from '../../Components/AuthForm/LogInForm';

export default function AuthPage({ setUser }) {
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [pageTitle, setPageTitle] = useState("PetDoc");

  const handleCreateAccountClick = () => {
    setShowSignUpForm(true);
    setShowLoginForm(false);
    setPageTitle("Create An Account");
  };

  return (
    <div className="auth-page-container">
      <h1>{pageTitle}</h1>
      {showLoginForm && (
        <div className="auth-form-container">
          <LogInForm setUser={setUser} />
        </div>
      )}
      {showLoginForm && <h2>New User?</h2>}
      {showLoginForm && (
        <button className="signup-btn" onClick={handleCreateAccountClick}>
          Create An Account
        </button>
      )}
      {showSignUpForm && (
        <SignUpForm setUser={setUser} onCancel={() => { setShowSignUpForm(false); setShowLoginForm(true); }} />
      )}
    </div>
  );
}