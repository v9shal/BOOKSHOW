import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/authContext';
import api from '../service/api';

interface Bookmark {
  id: string;
  title: string;
  url: string;
  description?: string;
}

 const Dashboard = () => {
  const { user, logout } = useAuth();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      const { data } = await api.get('/bookmarks');
      setBookmarks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/bookmarks', { title, url, description: desc });
      setBookmarks((prev) => [data, ...prev]); 
      setTitle('');
      setUrl('');
      setDesc('');
    } catch (error) {
      alert('Failed to add bookmark');
    }
  };

  const handleDelete = async (id: string) => {
    const originalBookmarks = [...bookmarks];
    setBookmarks((prev) => prev.filter((b) => b.id !== id));

    try {
      await api.delete(`/bookmarks/${id}`);
    } catch (error) {
      setBookmarks(originalBookmarks);
      alert('Failed to delete');
    }
  };

  return (
    <div className="dashboard">
      <header>
        <h1>Welcome, {user?.email}</h1>
        <button onClick={logout}>Logout</button>
      </header>

      <section className="add-bookmark">
        <h3>Add New</h3>
        <form onSubmit={handleAdd}>
          <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
          <input placeholder="URL" value={url} onChange={e => setUrl(e.target.value)} required />
          <input placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} />
          <button type="submit">Add</button>
        </form>
      </section>

      <section className="list">
        <h3>My Bookmarks</h3>
        {loading ? <p>Loading...</p> : (
          <ul>
            {bookmarks.map((b) => (
              <li key={b.id}>
                <a href={b.url} target="_blank" rel="noreferrer"><strong>{b.title}</strong></a>
                <p>{b.description}</p>
                <button onClick={() => handleDelete(b.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Dashboard