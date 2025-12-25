import { useAuth } from "../Context/authContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

type Bookmark = {
  id: string;
  title: string;
  url: string;
  description: string;
};

const BookmarkPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/bookmarks",
          { withCredentials: true }
        );
        setBookmarks(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBookmarks();
  }, []);

  const handleCreateBookmark = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/bookmarks",
        { title, url, description },
        { withCredentials: true }
      );
      setBookmarks(prev => [...prev, res.data]);
      setTitle("");
      setUrl("");
      setDescription("");
    } catch (err) {
      console.error(err);
    }
  };

  const handledelete=async(id:string)=>{
    try{
        const response=axios.delete(
            ` http://localhost:5000/api/bookmarks/${id}`,
            {withCredentials:true}
        )
        console.log(response);
        setBookmarks(prev=>prev.filter(b=>b.id!==id))
    }
    catch(error){
        console.log(error);
    }
  }
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">

        <div className="bg-white rounded-xl shadow-md p-6 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Bookmarks</h1>
            <p className="text-gray-600">Welcome, {user?.name}</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>

        <form
          onSubmit={handleCreateBookmark}
          className="bg-white p-6 rounded-xl shadow-md mb-6 space-y-3"
        >
          <input
            className="w-full border p-2 rounded"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <input
            className="w-full border p-2 rounded"
            placeholder="URL"
            value={url}
            onChange={e => setUrl(e.target.value)}
            required
          />
          <input
            className="w-full border p-2 rounded"
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Bookmark
          </button>
        </form>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Bookmarks</h2>

          {bookmarks.length === 0 ? (
            <p className="text-gray-600">No bookmarks yet.</p>
          ) : (
            bookmarks.map(b => (
              <div key={b.id} className="border-b py-3">
                <h3 className="font-semibold">{b.title}</h3>
                <a
                  href={b.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600"
                >
                  {b.url}
                </a>
                <p className="text-gray-600">{b.description}</p>
                <button onClick={()=>{handledelete(b.id)}}>delete</button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default BookmarkPage;
