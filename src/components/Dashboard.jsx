// Dashboard.jsx
import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const Dashboard = () => {
  const [accountDetails, setAccountDetails] = useState({
    username: '',
    accountYear: '',
    accountStatus: '',
    price: '',
    listingType: '',
    imageUrl: '',
    sellerId: '',
    tradingEnabled: false,
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccountDetails({ ...accountDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'accountsCollection'), {
        ...accountDetails,
        tradingEnabled: accountDetails.tradingEnabled === 'true',
      });
      alert('Account listed successfully!');
    } catch (error) {
      console.error('Error listing account:', error.message);
    }
  };

  return (
    <div className="dashboard">
      <h1>List an Account</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={accountDetails.username}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="accountYear"
          placeholder="Account Year (2006 - Present)"
          value={accountDetails.accountYear}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="accountStatus"
          placeholder="Account Status"
          value={accountDetails.accountStatus}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="price"
          placeholder="Price (leave blank for trade only)"
          value={accountDetails.price}
          onChange={handleChange}
        />
        <select
          name="listingType"
          value={accountDetails.listingType}
          onChange={handleChange}
          required
        >
          <option value="">Select Listing Type</option>
          <option value="Sell">Sell</option>
          <option value="Trade">Trade</option>
        </select>
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={accountDetails.imageUrl}
          onChange={handleChange}
        />
        <input
          type="text"
          name="sellerId"
          placeholder="Seller ID"
          value={accountDetails.sellerId}
          onChange={handleChange}
        />
        <input
          type="checkbox"
          name="tradingEnabled"
          checked={accountDetails.tradingEnabled}
          onChange={(e) => setAccountDetails({ ...accountDetails, tradingEnabled: e.target.checked })}
        />
        <label>Trading Enabled</label>
        <textarea
          name="description"
          placeholder="Description"
          value={accountDetails.description}
          onChange={handleChange}
        />
        <button type="submit">List Account</button>
      </form>
    </div>
  );
};

export default Dashboard;
