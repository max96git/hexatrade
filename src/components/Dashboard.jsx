import React, { useEffect, useState } from 'react';
import { db } from '../firebase'; // Adjust the path if necessary
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import './Dashboard.css'; // Optional CSS for styling

const Dashboard = () => {
  const [accounts, setAccounts] = useState([]);
  const [username, setUsername] = useState('');
  const [accountYear, setAccountYear] = useState('');
  const [accountStatus, setAccountStatus] = useState('');
  const [price, setPrice] = useState('');
  const [listingType, setListingType] = useState('Sell'); // Default to 'Sell'
  const [imageUrl, setImageUrl] = useState('');
  const [tradingEnabled, setTradingEnabled] = useState(false);
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const accountsCollection = collection(db, 'accountsCollection');
        const accountsSnapshot = await getDocs(accountsCollection);
        const accountsList = accountsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAccounts(accountsList);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    fetchAccounts();
  }, []);

  const handleAddAccount = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'accountsCollection'), {
        username,
        AccountYear: accountYear,
        AccountStatus: accountStatus,
        Price: listingType === 'Trade' ? null : price, // Set price to null for trade-only accounts
        ListingType: listingType,
        ImageUrl: imageUrl,
        SellerID: '', // You can set the seller ID as needed, possibly from auth user
        TradingEnabled: tradingEnabled,
        Description: description,
      });

      // Reset form fields
      setUsername('');
      setAccountYear('');
      setAccountStatus('');
      setPrice('');
      setListingType('Sell');
      setImageUrl('');
      setTradingEnabled(false);
      setDescription('');

      // Fetch updated accounts
      fetchAccounts();
    } catch (error) {
      console.error('Error adding account:', error);
    }
  };

  const handleDeleteAccount = async (id) => {
    try {
      await deleteDoc(doc(db, 'accountsCollection', id));
      fetchAccounts(); // Refresh the account list after deletion
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <div className="dashboard">
      <h1>Account Dashboard</h1>
      <form onSubmit={handleAddAccount}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <input 
          type="number" 
          placeholder="Account Year (2006 - present)" 
          value={accountYear} 
          onChange={(e) => setAccountYear(e.target.value)} 
          min="2006" 
          max={new Date().getFullYear()} 
          required 
        />
        <input 
          type="text" 
          placeholder="Account Status" 
          value={accountStatus} 
          onChange={(e) => setAccountStatus(e.target.value)} 
          required 
        />
        <input 
          type="number" 
          placeholder="Price (leave blank for trade-only)" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          min="0" 
        />
        <select 
          value={listingType} 
          onChange={(e) => setListingType(e.target.value)} 
          required
        >
          <option value="Sell">Sell</option>
          <option value="Trade">Trade</option>
        </select>
        <input 
          type="text" 
          placeholder="Image URL" 
          value={imageUrl} 
          onChange={(e) => setImageUrl(e.target.value)} 
        />
        <label>
          Trading Enabled:
          <input 
            type="checkbox" 
            checked={tradingEnabled} 
            onChange={(e) => setTradingEnabled(e.target.checked)} 
          />
        </label>
        <textarea 
          placeholder="Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
        <button type="submit">Add Account</button>
      </form>

      <h2>Listed Accounts</h2>
      {accounts.length > 0 ? (
        <ul>
          {accounts.map((account) => (
            <li key={account.id}>
              <h3>{account.username} ({account.AccountYear})</h3>
              <p>Status: {account.AccountStatus}</p>
              <p>Price: {account.ListingType === 'Trade' ? 'Trade Only' : `$${account.Price}`}</p>
              <p>Type: {account.ListingType}</p>
              <p>Description: {account.Description}</p>
              {account.ImageUrl && <img src={account.ImageUrl} alt={`${account.username} image`} />}
              <button onClick={() => handleDeleteAccount(account.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No accounts listed yet.</p>
      )}
    </div>
  );
};

export default Dashboard;
