import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', description: '' });

  // Load projects from localStorage on initial render
  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    setProjects(savedProjects);
  }, []);

  // Save projects to localStorage whenever it changes
  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem('projects', JSON.stringify(projects));
    }
  }, [projects]);

  const handleCreateProject = () => {
    if (!newProject.name.trim()) return;
    const newProjects = [...projects, newProject];
    setProjects(newProjects);
    setNewProject({ name: '', description: '' });
    setShowModal(false);
  };

  const handleDeleteProject = (projectIndex) => {
   // Remove the corresponding tasks from localStorage
  localStorage.removeItem(`tasks_${projectIndex}`);

  // Remove the project from the state
  const updatedProjects = projects.filter((_, idx) => idx !== projectIndex);

  // Reindex remaining tasks if needed
  const reindexedProjects = updatedProjects.map((proj, newIndex) => {
    // Move the task data from the old index to the new index
    const oldIndex = newIndex >= projectIndex ? newIndex + 1 : newIndex;
    const oldKey = `tasks_${oldIndex}`;
    const newKey = `tasks_${newIndex}`;

    const taskData = localStorage.getItem(oldKey);
    if (taskData) {
      localStorage.setItem(newKey, taskData);
      localStorage.removeItem(oldKey);
    }

    return proj;
  });

  // Update state and localStorage
  setProjects(reindexedProjects);
  localStorage.setItem('projects', JSON.stringify(reindexedProjects));

  };

  return (
    <div className='mt-1 ml-8'>
        <p className='text-7xl mb-9 font-medium text-gray-500'>🗂️ Projects</p>
    <div className="flex gap-4 flex-wrap">
      {/* Create New Project Button */}
      <div className="border p-4 rounded w-64 flex items-center justify-center hover:shadow">
        <button onClick={() => setShowModal(true)}>+ Create New Project</button>
      </div>

      {/* Project Cards */}
      {projects.map((proj, idx) => (
        <div key={idx} className="w-64">
          
          <div className="p-4 border rounded shadow-md bg-white hover:shadow-lg transition">
                 <Link to={`/project/${idx}`} state={{ project: proj }}>  <h2 className="font-bold text-lg">{proj.name}</h2></Link>
            <p className="text-sm text-gray-600">{proj.description}</p>
            {/* Delete Button */}
            <button
              onClick={() => handleDeleteProject(idx)}
              className="mt-2 text-red-500 hover:text-red-700 text-sm"
            >
              Delete Project
            </button>
          </div>
        </div>
      ))}

      {/* Modal for creating new project */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Create New Project</h2>
            <input
              type="text"
              placeholder="Project Name"
              value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              className="w-full p-2 border rounded mb-2"
            />
            <textarea
              placeholder="Description"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              className="w-full p-2 border rounded mb-4"
              rows={3}
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal(false)} className="px-4 py-2">
                Cancel
              </button>
              <button onClick={handleCreateProject} className="bg-blue-500 text-white px-4 py-2 rounded">
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Projects;
