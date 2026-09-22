import React, { useState } from 'react';
import { triggerAlert } from '../services/api';

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState('');

  const sendSOS = () => {
    if (!navigator.geolocation) return alert('Geolocation not supported');
    setSending(true);
    setStatus('Getting your location...');

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          await triggerAlert(user.id, {
            message: `🚨 EMERGENCY! ${user.fullName} needs help!`,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          });
          setStatus('✅ SOS Alert sent to all your emergency contacts!');
        } catch {
          setStatus('❌ Failed to send alert. Please try calling 1091.');
        }
        setSending(false);
      },
      () => {
        setStatus('❌ Location access denied. Enable it to send alerts.');
        setSending(false);
      }
    );
  };

  return (
    <div style={styles.wrap}>
      <h1 style={{ color: '#7B1FA2' }}>Welcome, {user.fullName} 👋</h1>
      <p style={{ color: '#666', marginBottom: '40px' }}>You're safe. We're here for you.</p>

      <div style={styles.sosContainer}>
        <button onClick={sendSOS} disabled={sending} style={styles.sosBtn}>
          {sending ? 'SENDING...' : 'SOS'}
        </button>
        <p style={{ marginTop: '20px', fontWeight: 'bold', color: '#7B1FA2' }}>
          Press the button in an emergency
        </p>
        {status && (
          <p style={{ marginTop: '10px', color: status.startsWith('✅') ? 'green' : 'red' }}>
            {status}
          </p>
        )}
      </div>

      <div style={styles.quick}>
        <a href="tel:1091" style={styles.quickCard}>📞<br/>Police<br/>1091</a>
        <a href="tel:181" style={styles.quickCard}>🆘<br/>Women Helpline<br/>181</a>
        <a href="tel:112" style={styles.quickCard}>🚑<br/>Emergency<br/>112</a>
        <a href="tel:1098" style={styles.quickCard}>👶<br/>Child Helpline<br/>1098</a>
      </div>
    </div>
  );
}

const styles = {
  wrap: { padding: '40px', textAlign: 'center', background: '#faf5ff',
    minHeight: 'calc(100vh - 70px)' },
  sosContainer: { margin: '30px auto', maxWidth: '500px' },
  sosBtn: { width: '220px', height: '220px', borderRadius: '50%',
    background: 'radial-gradient(circle, #ff4d6d, #c9184a)', color: 'white',
    border: '8px solid #ffb3c1', fontSize: '42px', fontWeight: 'bold',
    cursor: 'pointer', animation: 'pulse 1.5s infinite' },
  quick: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: '15px', maxWidth: '700px', margin: '40px auto' },
  quickCard: { background: 'white', padding: '20px', borderRadius: '12px',
    textDecoration: 'none', color: '#333', fontWeight: 'bold',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }
};
