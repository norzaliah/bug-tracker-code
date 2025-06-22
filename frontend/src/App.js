import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Auth';
import Bugs from './pages/Bugs';
import Projects from './pages/Projects';
import BugForm from './components/BugForm';
import Bugs from './pages/Bugs';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="bugs" element={<Bugs />} />
          <Route path="projects" element={<Projects />} />
          <Route path="/bugs/new" element={<BugForm />} />
          <Route path="/bugs/:id" element={<BugForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;