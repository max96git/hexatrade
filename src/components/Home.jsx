// src/components/Home.jsx
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import './Home.css';

const Home = () => {
  const [accounts, setAccounts] = useState([]);

  // Fetch listed accounts from Firestore
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'accounts'));
        const accountsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAccounts(accountsList);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    fetchAccounts();
  }, []);

  return (
    <div className="home-container">
      <h1>Listed Accounts</h1>
      <div className="accounts-list">
        {accounts.map((account) => (
          <div key={account.id} className="account-card">
            <img src={account.ImageUrl} alt={account.username} />
            <h3>{account.username}</h3>
            <p>Year: {account.AccountYear}</p>
            <p>Status: {account.AccountStatus}</p>
            {account.ListingType === 'trade' ? (
              <p>Available for Trade</p>
            ) : (
              <p>Price: {account.Price}</p>
            )}
            <p>Description: {account.Description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
