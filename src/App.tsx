import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Web3Provider } from './context/Web3Context';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Search from './pages/Search';
import AgentDetail from './pages/AgentDetail';
import Marketplace from './pages/Marketplace';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <Web3Provider>
        <Router>
          <div className="flex flex-col min-h-screen bg-gray-900 text-white">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/search" element={<Search />} />
                <Route path="/agent/:id" element={<AgentDetail />} />
                <Route path="/marketplace" element={<Marketplace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </Web3Provider>
    </ThemeProvider>
  );
}

export default App;
