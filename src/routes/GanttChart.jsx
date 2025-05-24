

import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const GanttChart = () => {
  const { projectId } = useParams();
  const location = useLocation();
  const project = location.state?.project;

  const [showModal, setShowModal] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [newTask, setNewTask] = useState({
    name: '',
    start: '',
    end: '',
    dependency: '',
    percent: '',
  });
  const [tasks, setTasks] = useState([]);
  const [chartReady, setChartReady] = useState(false);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem(`tasks_${projectId}`)) || [];
    setTasks(savedTasks);

    window.google.charts.load('current', { packages: ['gantt'] });
    window.google.charts.setOnLoadCallback(() => {
      setChartReady(true);
    });
  }, [projectId]);

  useEffect(() => {
    if (chartReady && tasks.length > 0) {
      drawChart();
    }
  }, [chartReady, tasks]);

  const drawChart = () => {
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

    const formattedTasks = tasks.map(task => {
      // task[2] and task[3] might be strings or Date objects, ensure Date objects here
      const start = new Date(task[2]);
      const end = new Date(task[3]);
      return [task[0], task[1], start, end, task[4], task[5], task[6]];
    });

    data.addRows(formattedTasks);

    const options = {
      height: 400,
      gantt: {
        labelStyle: {
          fontName: 'Arial',
          fontSize: 15,
          color: '#000',
        },
        barHeight: 30,
        criticalPathEnabled: true,
        criticalPathStyle: {
          stroke: '#e64a19',
          strokeWidth: 2
        },
        innerGridTrack: { fill: '#ffedd5' },
        innerGridDarkTrack: { fill: '#fffbeb' },
        arrow: {
          angle: 45,
          width: 2,
          color: '#e11d48',
          radius: 0,
        },
      },
    };

    const chart = new window.google.visualization.Gantt(container);
    chart.draw(data, options);
  };

  const handleAddTask = () => {
    if (newTask.name === '') return alert('Please Enter Task Name');
    if (newTask.start === '') return alert('Please Enter Start Date and Time');
    if (newTask.end === '') return alert('Please Enter End Date and Time');

    const start = new Date(newTask.start);
    const end = new Date(newTask.end);
    const percentComplete = parseInt(newTask.percent, 10) || 0;

    if (editingTaskId) {
      const updatedTasks = tasks.map(task => {
        if (task[0] === editingTaskId) {
          const label = `${task[0]}. ${newTask.name}`;
          return [task[0], label, start, end, null, percentComplete, newTask.dependency || null];
        }
        return task;
      });
      setTasks(updatedTasks);
      localStorage.setItem(`tasks_${projectId}`, JSON.stringify(updatedTasks));
    } else {
      const id = (tasks.length + 1).toString();
      const label = `${id}. ${newTask.name}`;
      const newRow = [id, label, start, end, null, percentComplete, newTask.dependency || null];
      const updatedTasks = [...tasks, newRow];
      setTasks(updatedTasks);
      localStorage.setItem(`tasks_${projectId}`, JSON.stringify(updatedTasks));
    }

    setShowModal(false);
    setEditingTaskId(null);
    setNewTask({ name: '', start: '', end: '', dependency: '', percent: '' });
  };

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find(task => task[0] === taskId);
    if (!taskToEdit) return;
    setEditingTaskId(taskId);
    setNewTask({
      name: taskToEdit[1].replace(`${taskId}. `, ''),
      // Convert Date to 'YYYY-MM-DDTHH:mm' format for datetime-local input
      start: new Date(taskToEdit[2]).toISOString().slice(0, 16),
      end: new Date(taskToEdit[3]).toISOString().slice(0, 16),
      dependency: taskToEdit[6] || '',
      percent: taskToEdit[5] ? taskToEdit[5].toString() : '0',
    });
    setShowModal(true);
  };

  const handleDeleteTask = (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    const updatedTasks = tasks.filter(task => task[0] !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem(`tasks_${projectId}`, JSON.stringify(updatedTasks));
  };

  const handleExportPDF = async () => {
    const chartElement = document.getElementById('gantt_chart');
    if (!chartElement) return alert('No chart to export!');

    const canvas = await html2canvas(chartElement);
    const imgData = canvas.toDataURL('image/png');

    const pdfWidth = canvas.width;
    const pdfHeight = canvas.height + 40;

    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [pdfWidth, pdfHeight],
    });

    pdf.setFontSize(30);
    pdf.setFont('helvetica', 'bold');
    pdf.text(project?.name || `Project #${projectId}`, 10, 25);

    pdf.addImage(imgData, 'PNG', 0, 40, canvas.width, canvas.height);

    pdf.save(`${project?.name || 'GanttChart'}_${projectId}.pdf`);
  };

  return (
    <div className='h-screen ml-80 mt-3'>
      <h1 className="text-4xl font-bold mb-4 ml-4">
        {project?.name || `Project #${projectId}`} - Gantt Chart
      </h1>

      <div className="mb-4 flex gap-2 ml-4">
        <button
          onClick={() => {
            setEditingTaskId(null);
            setNewTask({ name: '', start: '', end: '', dependency: '', percent: '' });
            setShowModal(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
        <button
          onClick={handleExportPDF}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Export PDF
        </button>
      </div>

      {tasks.length === 0 ? (
        <div className="text-gray-500 text-center py-10 border border-dashed border-gray-300 rounded">
          No tasks available. Please add a task.
        </div>
      ) : (
        <>
          <div className='mx-4' id="gantt_chart" style={{ height: 400 }}></div>

          <div className="mx-4">
            <h2 className="text-3xl font-semibold mb-2">Tasks List</h2>
            <ul className='pb-5'>
              {tasks.map(task => {
                // Format start and end dates to readable strings
                const startDate = new Date(task[2]);
                const endDate = new Date(task[3]);
                const formatDateTime = (date) => {
                  return date.toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  }) + ' ' + date.toLocaleTimeString(undefined, {
                    hour: '2-digit',
                    minute: '2-digit',
                  });
                };

                return (
                  <li key={task[0]} className="flex justify-between items-center border p-2 mb-2 rounded">
                    <span>{task[1]}</span>
                    <span className="text-gray-600 mx-4 whitespace-nowrap">
                      {formatDateTime(startDate)} - {formatDateTime(endDate)}
                    </span>
                    <div className="flex gap-2">
                      <button
                        className="bg-yellow-400 text-black px-3 py-1 rounded"
                        onClick={() => handleEditTask(task[0])}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded"
                        onClick={() => handleDeleteTask(task[0])}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-xl mb-4">{editingTaskId ? 'Edit Task' : 'Add Task'}</h2>
            <input
              type="text"
              placeholder="Task Name"
              className="w-full mb-2 p-2 border"
              value={newTask.name}
              onChange={e => setNewTask({ ...newTask, name: e.target.value })}
            />
            {/* Changed from type=date to datetime-local */}
            <input
              type="datetime-local"
              placeholder="Start Date and Time"
              className="w-full mb-2 p-2 border"
              value={newTask.start}
              onChange={e => setNewTask({ ...newTask, start: e.target.value })}
            />
            <input
              type="datetime-local"
              placeholder="End Date and Time"
              className="w-full mb-2 p-2 border"
              value={newTask.end}
              onChange={e => setNewTask({ ...newTask, end: e.target.value })}
            />
            <input
              type="text"
              placeholder="Dependency (Task ID)"
              className="w-full mb-2 p-2 border"
              value={newTask.dependency}
              onChange={e => setNewTask({ ...newTask, dependency: e.target.value })}
            />
            <input
              type="number"
              placeholder="Percent Complete"
              className="w-full mb-4 p-2 border"
              value={newTask.percent}
              onChange={e => setNewTask({ ...newTask, percent: e.target.value })}
              min={0}
              max={100}
            />
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-400 px-4 py-2 rounded"
                onClick={() => {
                  setShowModal(false);
                  setEditingTaskId(null);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleAddTask}
              >
                {editingTaskId ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GanttChart;
