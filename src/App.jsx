import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostList from './components/PostList';
import PostView from './components/PostView';
import PostForm from './components/PostForm';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={PostList} />
        <Route exact path="/posts/new" Component={PostForm} />
        <Route exact path="/posts/:postId/edit" Component={PostForm} />
        <Route exact path="/posts/:postId" Component={PostView} />
      </Routes>
    </Router>
  );
}

export default App;
