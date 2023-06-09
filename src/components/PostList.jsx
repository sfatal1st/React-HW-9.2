import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:7070/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error('Ошибка при загрузке постов:', error));
  }, []);

  return (
    <div>
      <h1>Список постов</h1>
      <Link to="/posts/new">Создать пост</Link>
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          <h2>{post.content}</h2>
          <p>Создан: {moment(post.created).fromNow()}</p>
          <Link to={`/posts/${post.id}`}>Просмотр</Link>
        </div>
      ))}
    </div>
  );
}

export default PostList;