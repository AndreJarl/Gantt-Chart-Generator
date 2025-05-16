import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Projects from './routes/Projects';
import GanttChart from './routes/GanttChart';
import About from './routes/About';
import Home from './Home';

function App() {
  return (
   
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ">
          <Routes>
               <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/project/:projectId" element={<GanttChart />} />
             <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>

  );
}

export default App;
