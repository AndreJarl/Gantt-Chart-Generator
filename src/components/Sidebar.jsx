import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();

  return (
    <div className="bg-cyan-500 w-80 min-h-screen py-4 px-10 space-y-4">
      <p className='text-5xl text-white font-bold mb-10 mt-2'>ACSL PLANNER</p>

      <Link
        to="/"
        className="block p-2 bg-white rounded"
      >
        🏠 Home {location.pathname === '/' && '↩️'}
      </Link>

      <Link
        to="/projects"
        className="block p-2 bg-white rounded"
      >
        🗂️ Projects {location.pathname === '/projects' && '↩️'}
      </Link>

      <Link
        to="/about"
        className="block p-2 bg-white rounded"
      >
        ℹ️ About {location.pathname === '/about' && '↩️'}
      </Link>
    </div>
  );
}

export default Sidebar;
