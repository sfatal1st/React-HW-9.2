import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import moment from 'moment';

function PostView() {
  const { postId } = useParams();
  const [post, setPost] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:7070/posts/${postId}`)
      .then((response) => response.json())
      .then((data) => setPost(data))
      .catch((error) => console.error('Ошибка при загрузке поста:', error));
  }, [postId]);

  const handleDelete = () => {
    fetch(`http://localhost:7070/posts/${postId}`, { method: 'DELETE' })
      .then(() => {
        console.log('Пост удален');
        navigate('/');
      })
      .catch((error) => console.error('Ошибка при удалении поста:', error));
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Просмотр поста</h2>
      <div>
        <h3>{post.post.content}</h3>
        <p>Создан: {moment(post.created).format('YYYY-MM-DD HH:mm:ss')}</p>
      </div>
      <button onClick={handleDelete}>Удалить</button>
      <Link to={`/posts/${postId}/edit`}>Редактировать</Link>
      <Link to="/">На главную</Link>
    </div>
  );
}

export default PostView;