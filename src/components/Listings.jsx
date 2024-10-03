import React from 'react';

const Listings = ({ account, onTrade, onDM }) => {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{account.name}</h3>
      <p style={styles.description}>{account.description}</p>
      <p style={styles.price}>Price: {account.price} WStuff</p>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => onTrade(account)}>Trade</button>
        <button style={styles.button} onClick={() => onDM(account.sellerId)}>DM</button>
      </div>
    </div>
  );
};

// Styles for the Listings component
const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    margin: '16px',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s',
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  description: {
    fontSize: '14px',
    margin: '8px 0',
  },
  price: {
    fontSize: '16px',
    color: '#ff5722', // Color for the price
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '12px',
  },
  button: {
    backgroundColor: '#4caf50', // Green background for the button
    color: '#fff', // White text color
    border: 'none',
    borderRadius: '4px',
    padding: '10px 16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    flex: 1,
    margin: '0 5px',
  },
};

export default Listings;
