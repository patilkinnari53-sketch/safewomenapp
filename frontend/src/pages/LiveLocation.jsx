import React, { useState } from 'react';

export default function LiveLocation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');
  const [watching, setWatching] = useState(false);
  const [watchId, setWatchId] = useState(null);

  const startTracking = () => {
    if (!navigator.geolocation) return setError('Geolocation not supported');
    setError('');
    setWatching(true);
    const id = navigator.geolocation.watchPosition(
      (pos) => setLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        accuracy: pos.coords.accuracy
      }),
      () => setError('Unable to access location'),
      { enableHighAccuracy: true }
    );
    setWatchId(id);
  };

  const stopTracking = () => {
    if (watchId !== null) navigator.geolocation.clearWatch(watchId);
    setWatching(false);
    setWatchId(null);
  };

  const shareLocation = () => {
    if (!location) return;
    const link = `https://www.google.com/maps?q=${location.lat},${location.lng}`;
    if (navigator.share) {
      navigator.share({
        title: 'My Live Location',
        text: 'I am here:',
        url: link
      });
    } else {
      navigator.clipboard.writeText(link);
      alert('Location link copied to clipboard!');
    }
  };

  return (
    <div style={styles.wrap}>
      <h1 style={{ color: '#7B1FA2' }}>📍 Live Location</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        Share your real-time location with trusted contacts.
      </p>

      <div style={styles.card}>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div style={styles.buttons}>
          {!watching ? (
            <button onClick={startTracking} style={styles.btnGreen}>▶ Start Tracking</button>
          ) : (
            <button onClick={stopTracking} style={styles.btnRed}>■ Stop Tracking</button>
          )}
          <button onClick={shareLocation} disabled={!location} style={styles.btnShare}>
            📤 Share Location
          </button>
        </div>

        {location && (
          <div style={styles.info}>
            <p><strong>Latitude:</strong> {location.lat.toFixed(6)}</p>
            <p><strong>Longitude:</strong> {location.lng.toFixed(6)}</p>
            <p><strong>Accuracy:</strong> ±{location.accuracy.toFixed(0)} m</p>
            <a
              href={`https://www.google.com/maps?q=${location.lat},${location.lng}`}
              target="_blank"
              rel="noreferrer"
              style={styles.link}
            >
              🗺️ Open in Google Maps
            </a>
          </div>
        )}

        {watching && !location && (
          <p style={{ color: '#7B1FA2' }}>📡 Getting your location...</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  wrap: { padding: '40px', maxWidth: '700px', margin: '0 auto',
    background: '#faf5ff', minHeight: 'calc(100vh - 70px)' },
  card: { background: 'white', padding: '30px', borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)', textAlign: 'center' },
  buttons: { display: 'flex', gap: '15px', justifyContent: 'center',
    flexWrap: 'wrap', marginBottom: '20px' },
  btnGreen: { background: '#28a745', color: 'white', border: 'none',
    padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' },
  btnRed: { background: '#dc3545', color: 'white', border: 'none',
    padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' },
  btnShare: { background: '#7B1FA2', color: 'white', border: 'none',
    padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' },
  info: { background: '#faf5ff', padding: '20px', borderRadius: '10px',
    textAlign: 'left', marginTop: '20px' },
  link: { color: '#7B1FA2', fontWeight: 'bold' }
};
