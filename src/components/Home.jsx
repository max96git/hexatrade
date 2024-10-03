import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase'; // Ensure your firebase setup is correct

function Home() {
  const [accounts, setAccounts] = useState([]);

  // Fetch listed accounts from Firestore
  useEffect(() => {
    const fetchAccounts = async () => {
      const accountsCollection = collection(db, 'accounts');
      const accountSnapshot = await getDocs(accountsCollection);
      const accountList = accountSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAccounts(accountList);
    };
    fetchAccounts();
  }, []);

  return (
    <div>
      <h1>Listed Accounts</h1>
      {accounts.length === 0 ? (
        <p>No accounts listed yet!</p>
      ) : (
        <ul>
          {accounts.map(account => (
            <li key={account.id}>
              <h3>{account.username}</h3>
              <p>Account Year: {account.AccountYear}</p>
              <p>Status: {account.AccountStatus}</p>
              {account.ListingType === 'trade' ? (
                <p>Trade Only</p>
              ) : (
                <p>Price: {account.Price}</p>
              )}
              <img src={account.ImageUrl} alt={account.username} width="100" />
              <p>Description: {account.Description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;
