import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/api';

export default function Register() {
  const [form, setForm] = useState({ fullName: '', email: '', password: '', phoneNumber: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await registerUser(form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div style={styles.wrap}>
      <form onSubmit={submit} style={styles.form}>
        <h2 style={{ color: '#7B1FA2', textAlign: 'center' }}>Create Account</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input style={styles.input} placeholder="Full Name" required
          onChange={e => setForm({ ...form, fullName: e.target.value })} />
        <input style={styles.input} placeholder="Email" type="email" required
          onChange={e => setForm({ ...form, email: e.target.value })} />
        <input style={styles.input} placeholder="Phone Number" required
          onChange={e => setForm({ ...form, phoneNumber: e.target.value })} />
        <input style={styles.input} placeholder="Password" type="password" required
          onChange={e => setForm({ ...form, password: e.target.value })} />
        <button style={styles.btn} type="submit">Register</button>
        <p style={{ textAlign: 'center', marginTop: '10px' }}>
          Already registered? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

const styles = {
  wrap: { display: 'flex', justifyContent: 'center', alignItems: 'center',
    minHeight: 'calc(100vh - 70px)', background: '#faf5ff' },
  form: { background: 'white', padding: '40px', borderRadius: '15px', width: '380px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)' },
  input: { width: '100%', padding: '12px', margin: '10px 0', borderRadius: '8px',
    border: '1px solid #ddd', boxSizing: 'border-box' },
  btn: { width: '100%', padding: '12px', background: '#E91E63', color: 'white',
    border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer', marginTop: '10px' }
};
