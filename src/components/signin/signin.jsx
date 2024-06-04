import React from 'react';
import { SignInButton } from '@clerk/clerk-react';
import './SignInPage.scss'; // Import the CSS file for styling

const SignInPage = () => {
  return (
    <div className="sign-in-container">
      <div className="sign-in-box">
        <h1>Welcome to My App</h1>
        <p>Please sign in to continue</p>
        <SignInButton />
      </div>
    </div>
  );
};

export default SignInPage;
