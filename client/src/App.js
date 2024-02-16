import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";
import Join from "./pages/Join";
import List from "./pages/ChatList.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/list" element={<List />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/" element={<Join />} />
      </Routes>
    </Router>
  );
}

export default App;
