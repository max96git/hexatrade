import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AccountListingLoader from './AccountListingLoader'; 
import Listings from './Listings';

const Home = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch('/api/accounts'); 
        const data = await response.json();
        setAccounts(data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  return (
    <div style={styles.container}>
      <h1>Welcome to Hexatrade</h1>
      <div style={styles.buttonContainer}>
        <Link to="/login" style={styles.link}>
          <button style={styles.button}>Login</button>
        </Link>
        <Link to="/signup" style={styles.link}>
          <button style={styles.button}>Signup</button>
        </Link>
        <Link to="/list-account" style={styles.link}>
          <button style={styles.button}>List Account</button>
        </Link>
      </div>

      <h2 style={styles.subheading}>Available Accounts</h2>
      {loading ? (
        <AccountListingLoader />
      ) : (
        <div style={styles.accountList}>
          {accounts.length === 0 ? (
            <p>No accounts available.</p>
          ) : (
            accounts.map((account) => (
              <Listings key={account.id} account={account} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    fontFamily: 'Inter, sans-serif',
    backgroundColor: '#f0f0f0',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  link: {
    textDecoration: 'none',
    margin: '10px',
  },
  button: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007BFF',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
  subheading: {
    marginTop: '40px',
  },
  accountList: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  accountItem: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '15px',
    margin: '10px',
    width: '300px',
  },
};

export default Home;
