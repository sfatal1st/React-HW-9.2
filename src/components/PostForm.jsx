import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

function PostForm() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (postId) {
      fetch(`http://localhost:7070/posts/${postId}`)
        .then((response) => response.json())
        .then((data) => {
          setContent(data.content);
          setIsEditing(true);
        })
        .catch((error) =>
          console.error('Ошибка при загрузке поста для редактирования:', error)
        );
    }
  }, [postId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const post = { content };

    if (isEditing) {
      fetch(`http://localhost:7070/posts/${postId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      })
        .then(() => navigate('/'))
        .catch((error) =>
          console.error('Ошибка при обновлении поста:', error)
        );
    } else {
      fetch('http://localhost:7070/posts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      })
        .then(() => navigate('/'))
        .catch((error) =>
          console.error('Ошибка при создании поста:', error)
        );
    }
  };
  
  return (
    <div>
      <h2>{isEditing ? 'Редактирование поста' : 'Создание поста'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Текст поста"
        />
        <button type="submit">
          {isEditing ? 'Сохранить' : 'Опубликовать'}
        </button>
        <Link to="/">Отмена</Link>
      </form>
    </div>
  );
}

export default PostForm;