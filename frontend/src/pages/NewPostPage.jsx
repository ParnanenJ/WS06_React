import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PostForm from '../components/PostForm.jsx'

// TODO (student): Implement create flow (POST /api/posts).
// Suggested steps:
// 1) Read form values in handleSubmit.
// 2) POST JSON body to /api/posts.
// 3) On success, navigate to /posts/:id.
// 4) Show an error message on failure.
const API = import.meta.env.VITE_API_URL;

function NewPostPage() {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(data) {
    setSubmitting(true)
    setError(null)

    try {
      const response = await fetch(`${API}/api/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error('Failed to create post')
      }

      const createdPost = await response.json()

      navigate(`/posts/${createdPost._id}`)

    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <h1 className="page-title">New post</h1>
      {error && <p className="status-msg error">{error}</p>}
      <PostForm onSubmit={handleSubmit} submitting={submitting} />
    </div>
  )
}

export default NewPostPage
