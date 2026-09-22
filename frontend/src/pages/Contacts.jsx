import React, { useEffect, useState } from 'react';
import { getContacts, addContact, deleteContact } from '../services/api';

export default function Contacts() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: '', phoneNumber: '', relationship: '', email: '' });
  const [msg, setMsg] = useState('');

  const loadContacts = async () => {
    try {
      const { data } = await getContacts(user.id);
      setContacts(data);
    } catch {
      setMsg('Failed to load contacts');
    }
  };

  useEffect(() => { loadContacts(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await addContact(user.id, form);
      setForm({ name: '', phoneNumber: '', relationship: '', email: '' });
      setMsg('✅ Contact added');
      loadContacts();
    } catch {
      setMsg('❌ Failed to add contact');
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Remove this contact?')) return;
    try {
      await deleteContact(id);
      loadContacts();
    } catch {
      setMsg('❌ Failed to delete');
    }
  };

  return (
    <div style={styles.wrap}>
      <h1 style={{ color: '#7B1FA2' }}>👥 Emergency Contacts</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        These people will be alerted when you press SOS.
      </p>

      <form onSubmit={submit} style={styles.form}>
        <h3>Add New Contact</h3>
        {msg && <p style={{ color: msg.startsWith('✅') ? 'green' : 'red' }}>{msg}</p>}
        <input style={styles.input} placeholder="Name" required
          value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input style={styles.input} placeholder="Phone Number" required
          value={form.phoneNumber} onChange={e => setForm({ ...form, phoneNumber: e.target.value })} />
        <input style={styles.input} placeholder="Relationship (e.g. Mother, Friend)"
          value={form.relationship} onChange={e => setForm({ ...form, relationship: e.target.value })} />
        <input style={styles.input} placeholder="Email (optional)" type="email"
          value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <button style={styles.btn} type="submit">Add Contact</button>
      </form>

      <div style={styles.list}>
        <h3>Your Contacts ({contacts.length})</h3>
        {contacts.length === 0 ? (
          <p style={{ color: '#888' }}>No contacts yet. Add your first one above.</p>
        ) : (
          contacts.map(c => (
            <div key={c.id} style={styles.card}>
              <div>
                <strong>{c.name}</strong>
                <p style={{ color: '#666', margin: '5px 0' }}>
                  📞 {c.phoneNumber} {c.relationship && `• ${c.relationship}`}
                </p>
                {c.email && <p style={{ color: '#888', fontSize: '13px' }}>{c.email}</p>}
              </div>
              <button onClick={() => remove(c.id)} style={styles.del}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  wrap: { padding: '40px', maxWidth: '800px', margin: '0 auto', background: '#faf5ff',
    minHeight: 'calc(100vh - 70px)' },
  form: { background: 'white', padding: '25px', borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)', marginBottom: '30px' },
  input: { width: '100%', padding: '12px', margin: '8px 0', borderRadius: '8px',
    border: '1px solid #ddd', boxSizing: 'border-box' },
  btn: { background: '#7B1FA2', color: 'white', border: 'none', padding: '12px 24px',
    borderRadius: '8px', cursor: 'pointer', fontSize: '16px', marginTop: '10px' },
  list: { background: 'white', padding: '25px', borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)' },
  card: { display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '15px', borderBottom: '1px solid #eee' },
  del: { background: '#E91E63', color: 'white', border: 'none', padding: '8px 16px',
    borderRadius: '8px', cursor: 'pointer' }
};
