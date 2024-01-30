import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chat from './pages/Chat';
import Join from './pages/Join';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/chat' element={<Chat />} />
        <Route path='/' element={<Join />} />
      </Routes>
    </Router>
  );
}

export default App;
