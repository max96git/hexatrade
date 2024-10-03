import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useHistory } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import Listings from './Listings';
import './Home.css';

const Home = () => {
  const [listedAccounts, setListedAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const accountsCollection = collection(db, 'accounts');
        const accountsSnapshot = await getDocs(accountsCollection);
        const accountsList = accountsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setListedAccounts(accountsList);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      history.push('/dashboard');
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };

  return (
    <div className="home">
      <h1>Hexatrade</h1>
      <form onSubmit={handleAuth}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
      </form>
      <button onClick={() => setIsSignup(!isSignup)}>
        {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
      </button>

      {loading ? (
        <p>Loading accounts...</p>
      ) : (
        <Listings accounts={listedAccounts} />
      )}
    </div>
  );
};

export default Home;
