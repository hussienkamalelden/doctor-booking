import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './layouts/Navbar';
import Home from './pages/Home';
import Appointments from './pages/Appointments';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointments" element={<Appointments />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
