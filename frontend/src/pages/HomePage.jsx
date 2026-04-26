import { useEffect, useState } from 'react'
import PostCard from '../components/PostCard.jsx'

// TODO (student): Fetch all posts from the backend and render them.
// Suggested steps:
// 1) Keep local state for posts, loading, and error.
// 2) In useEffect, call GET /api/posts.
// 3) Show loading and error states.
// 4) Map posts into PostCard components.
const API = import.meta.env.VITE_API_URL;

function HomePage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API}/api/posts`);

        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data = await response.json();

        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p className="status-msg">Loading posts…</p>
  if (error) return <p className="status-msg error">{error}</p>

  return (
    <div className="blog-page">
      <div className="page-heading">
        <p className="eyebrow">Blog</p>
        <h1 className="page-title">All posts</h1>
      </div>

      {posts.length === 0 ? (
        <p className="status-msg">No posts yet. Implement fetch logic in HomePage first.</p>
      ) : (
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post._id}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default HomePage
