import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { auth } from '../firebase';

const Home = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true); 
    const navigate = useNavigate();

    const handleAuth = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                // Log in user
                await auth.signInWithEmailAndPassword(username, password);
                navigate('/dashboard'); // Redirect to dashboard
            } else {
                // Sign up user
                await auth.createUserWithEmailAndPassword(username, password);
                navigate('/dashboard'); // Redirect to dashboard
            }
        } catch (error) {
            console.error('Error:', error.message);
            alert(error.message);
        }
    };

    return (
        <div className="home">
            <h1>Welcome to Hexatrade</h1>
            <form onSubmit={handleAuth}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
            </form>
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
            </button>
        </div>
    );
};

export default Home;
