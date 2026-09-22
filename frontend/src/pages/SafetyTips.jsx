import React from 'react';

const helplines = [
  { name: 'Police', number: '100', icon: '👮' },
  { name: 'Women Helpline', number: '181', icon: '🆘' },
  { name: 'Emergency', number: '112', icon: '🚑' },
  { name: 'Child Helpline', number: '1098', icon: '👶' },
  { name: 'Anti-Stalking', number: '1091', icon: '🚫' },
  { name: 'Domestic Abuse', number: '181', icon: '🏠' }
];

const tips = [
  { title: 'Share Your Location', desc: 'Always share your live location with a trusted contact when travelling alone.' },
  { title: 'Trust Your Instincts', desc: 'If something feels wrong, it probably is. Remove yourself from the situation.' },
  { title: 'Stay Aware', desc: 'Avoid distractions like headphones and phones when in unfamiliar areas.' },
  { title: 'Emergency Contacts', desc: 'Save emergency numbers on speed dial for quick access.' },
  { title: 'Travel in Groups', desc: 'Whenever possible, travel with friends, especially at night.' },
  { title: 'Learn Self-Defense', desc: 'Basic self-defense training can boost your confidence and safety.' },
  { title: 'Use Safe Apps', desc: 'Keep safety apps installed and functional on your phone.' },
  { title: 'Stick to Well-Lit Areas', desc: 'Prefer well-lit, populated routes over shortcuts through dark areas.' }
];

export default function SafetyTips() {
  return (
    <div style={styles.wrap}>
      <h1 style={{ color: '#7B1FA2', textAlign: 'center' }}>🆘 Safety Tips & Helplines</h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px' }}>
        Stay informed. Stay safe.
      </p>

      <h2 style={{ color: '#E91E63' }}>📞 Emergency Helplines (India)</h2>
      <div style={styles.helplines}>
        {helplines.map(h => (
          <a key={h.name} href={`tel:${h.number}`} style={styles.hCard}>
            <div style={{ fontSize: '32px' }}>{h.icon}</div>
            <strong>{h.name}</strong>
            <div style={{ color: '#7B1FA2', fontSize: '22px', fontWeight: 'bold' }}>{h.number}</div>
          </a>
        ))}
      </div>

      <h2 style={{ color: '#E91E63', marginTop: '50px' }}>🛡️ Safety Tips</h2>
      <div style={styles.tips}>
        {tips.map(t => (
          <div key={t.title} style={styles.tipCard}>
            <h3 style={{ color: '#7B1FA2' }}>{t.title}</h3>
            <p style={{ color: '#555' }}>{t.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  wrap: { padding: '40px', maxWidth: '1000px', margin: '0 auto',
    background: '#faf5ff', minHeight: 'calc(100vh - 70px)' },
  helplines: { display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '20px', marginTop: '20px' },
  hCard: { background: 'white', padding: '25px', borderRadius: '12px',
    textAlign: 'center', textDecoration: 'none', color: '#333',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)' },
  tips: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px', marginTop: '20px' },
  tipCard: { background: 'white', padding: '25px', borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }
};
