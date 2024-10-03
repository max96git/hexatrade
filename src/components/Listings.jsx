// src/components/Listings.jsx
import React from "react";

const Listings = () => {
  const accounts = [
    { id: 1, username: "RobloxUser1", price: "$100" },
    { id: 2, username: "RobloxUser2", price: "$150" },
  ];

  return (
    <div>
      <h2>Account Listings on Hexatrade</h2>
      <ul>
        {accounts.map((account) => (
          <li key={account.id}>
            {account.username} - {account.price}
            <button>Trade</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Listings;
