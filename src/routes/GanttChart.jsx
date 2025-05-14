import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

const GanttChart = () => {
  const { projectId } = useParams();
  const location = useLocation();
  const project = location.state?.project;

  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({ name: '', start: '', end: '' });
  const [tasks, setTasks] = useState([]);
  const [chartReady, setChartReady] = useState(false);

  useEffect(() => {
    // Load tasks from localStorage for this project
    const savedTasks = JSON.parse(localStorage.getItem(`tasks_${projectId}`)) || [];
    setTasks(savedTasks);

    // Load Google Charts API only once on mount
    window.google.charts.load('current', { packages: ['gantt'] });
    window.google.charts.setOnLoadCallback(() => {
      setChartReady(true);
    });
  }, [projectId]);

  useEffect(() => {
    // Only draw the chart once the chart is ready and tasks have been added
    if (chartReady && tasks.length > 0) {
      drawChart();
    }
  }, [chartReady, tasks]); // Re-run when tasks change or chart is ready

  const drawChart = () => {
    // Check if google and visualization are available
    if (typeof window.google === 'undefined' || !window.google.visualization) {
      console.error('Google Charts not loaded');
      return;
    }

    const container = document.getElementById('gantt_chart');
    if (!container) {
      console.error('Container not found!');
      return;
    }

    const data = new window.google.visualization.DataTable();
    data.addColumn('string', 'Task ID');
    data.addColumn('string', 'Task Name');
    data.addColumn('date', 'Start Date');
    data.addColumn('date', 'End Date');
    data.addColumn('number', 'Duration');
    data.addColumn('number', 'Percent Complete');
    data.addColumn('string', 'Dependencies');

    // Convert date strings to Date objects
    const formattedTasks = tasks.map(task => {
      const start = new Date(task[2]);
      const end = new Date(task[3]);
      return [task[0], task[1], start, end, task[4], task[5], task[6]];
    });

    data.addRows(formattedTasks);

    const chart = new window.google.visualization.Gantt(container);
    chart.draw(data);
  };

  const handleAddTask = () => {
    const id = (tasks.length).toString();
    const start = new Date(newTask.start);
    const end = new Date(newTask.end);
    const newRow = [id, newTask.name, start, end, null, 0, null];
    const updatedTasks = [...tasks, newRow];
    setTasks(updatedTasks);

    // Save the updated tasks for this project to localStorage
    localStorage.setItem(`tasks_${projectId}`, JSON.stringify(updatedTasks));

    setShowModal(false);
    setNewTask({ name: '', start: '', end: '' });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        {project?.name || `Project #${projectId}`} - Gantt Chart
      </h1>

      <div className="mb-4">
        <button onClick={() => setShowModal(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <div className="text-gray-500 text-center py-10 border border-dashed border-gray-300 rounded">
          No tasks available. Please add a task.
        </div>
      ) : (
        <div id="gantt_chart" style={{ height: 400 }}></div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-xl mb-4">Add Task</h2>
            <input
              type="text"
              placeholder="Task Name"
              className="w-full mb-2 p-2 border"
              value={newTask.name}
              onChange={e => setNewTask({ ...newTask, name: e.target.value })}
            />
            <input
              type="date"
              className="w-full mb-2 p-2 border"
              value={newTask.start}
              onChange={e => setNewTask({ ...newTask, start: e.target.value })}
            />
            <input
              type="date"
              className="w-full mb-2 p-2 border"
              value={newTask.end}
              onChange={e => setNewTask({ ...newTask, end: e.target.value })}
            />
            <div className="flex justify-end gap-2">
              <button className="px-4 py-2" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2"
                onClick={handleAddTask}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GanttChart;
