// src/SignUpPage.jsx
import React, { useState } from 'react';
import { useSignUp } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

function SignUpPage() {
  const { signUp, isLoaded, setActive } = useSignUp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err) {
      setError(err.errors[0]?.message || 'Sign-up failed');
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const result = await signUp.attemptEmailAddressVerification({ code });
      await setActive({ session: result.createdSessionId });
      navigate('/'); // Redirect after signup
    } catch (err) {
      setError(err.errors[0]?.message || 'Verification failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={pendingVerification ? handleVerify : handleSignUp}
        className="bg-gray-800 p-8 rounded shadow-md w-96 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        {error && <p className="text-red-400 text-sm">{error}</p>}

        {!pendingVerification ? (
          <>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 rounded bg-gray-700 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 rounded bg-gray-700 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 p-2 rounded font-semibold"
            >
              Create Account
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter verification code"
              className="w-full p-2 rounded bg-gray-700 text-white"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 p-2 rounded font-semibold"
            >
              Verify Email
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default SignUpPage;
