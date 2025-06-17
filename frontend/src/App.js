import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Bugs from './pages/Bugs';
import Projects from './pages/Projects';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="bugs" element={<Bugs />} />
          <Route path="projects" element={<Projects />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;