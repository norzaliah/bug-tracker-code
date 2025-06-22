import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  
  return (
    <nav>
      {/* Your other navbar links here */}

      {/* Only show Logout when user is logged in */}
      {user && <button onClick={logout}>Logout</button>}
    </nav>
  );
}
