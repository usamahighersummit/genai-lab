// In your App.jsx or routing configuration
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MainLayout from './pages/MainLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lessons" element={<MainLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
