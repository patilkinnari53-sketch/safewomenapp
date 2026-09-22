import React, { useEffect, useState } from 'react';
import { getAlerts, resolveAlert } from '../services/api';

export default function AlertHistory() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const { data } = await getAlerts(user.id);
      setAlerts(data);
    } catch {
      console.error('Failed to load alerts');
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const resolve = async (id) => {
    await resolveAlert(id);
    load();
  };

  const statusColor = (s) =>
    s === 'ACTIVE' ? '#dc3545' : s === 'RESOLVED' ? '#28a745' : '#888';

  return (
    <div style={styles.wrap}>
      <h1 style={{ color: '#7B1FA2' }}>📜 Alert History</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        All your past SOS alerts.
      </p>

      {loading ? (
        <p>Loading...</p>
      ) : alerts.length === 0 ? (
        <div style={styles.empty}>
          <p style={{ fontSize: '48px' }}>✅</p>
          <p>No alerts yet. Stay safe!</p>
        </div>
      ) : (
        <div>
          {alerts.map(a => (
            <div key={a.id} style={styles.card}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ background: statusColor(a.status), color: 'white',
                    padding: '3px 12px', borderRadius: '12px', fontSize: '12px',
                    fontWeight: 'bold' }}>
                    {a.status}
                  </span>
                  <span style={{ color: '#888', fontSize: '13px' }}>
                    {new Date(a.createdAt).toLocaleString()}
                  </span>
                </div>
                <p style={{ marginTop: '10px' }}>{a.message}</p>
                {a.latitude && a.longitude && (
                  <a
                    href={`https://www.google.com/maps?q=${a.latitude},${a.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: '#7B1FA2', fontSize: '14px' }}
                  >
                    📍 View location on map
                  </a>
                )}
              </div>
              {a.status === 'ACTIVE' && (
                <button onClick={() => resolve(a.id)} style={styles.resolveBtn}>
                  Mark Resolved
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  wrap: { padding: '40px', maxWidth: '900px', margin: '0 auto',
    background: '#faf5ff', minHeight: 'calc(100vh - 70px)' },
  empty: { textAlign: 'center', padding: '60px', background: 'white',
    borderRadius: '12px', color: '#666' },
  card: { background: 'white', padding: '20px', borderRadius: '12px',
    marginBottom: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    gap: '15px' },
  resolveBtn: { background: '#28a745', color: 'white', border: 'none',
    padding: '10px 18px', borderRadius: '8px', cursor: 'pointer',
    alignSelf: 'flex-start' }
};
