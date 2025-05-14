import React, { useState } from 'react';

function Modal({ showModal, setShowModal, onSubmit }) {
  const [task, setTask] = useState({
    id: '',
    name: '',
    endDate: '',
    duration: '',
    percent: '',
    dependencies: '',
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (task.id === '' ){
        alert("Please input id");
        return;
      }
      if( task.name === ''){
         alert("Please input task name");
         return;
      }if( task.endDate === ''){
            alert("Please input task end data");
            return;
      }
      
    const newTask = {
      id: task.id,
      name: task.name,
      startDate: null,
      endDate: new Date(task.endDate),
      duration: parseInt(task.duration) * 24 * 60 * 60 * 1000,
      percent: parseInt(task.percent),
      dependencies: task.dependencies || null,
    };

    onSubmit(newTask);
    setTask({ id: '', name: '', endDate: '', duration: '', percent: '', dependencies: '' });
    setShowModal(false);
  };

  return (
    <div className="absolute top-10 border border-gray-500 right-64 z-30 w-[600px] h-[auto] flex flex-col gap-4 bg-white p-4 rounded shadow">
      <h2 className="font-bold mb-2">Add Task</h2>
      <input name="id" placeholder="Task ID" value={task.id} onChange={handleChange} className="border p-1 mb-1" />
      <input name="name" placeholder="Task Name" value={task.name} onChange={handleChange} className="border p-1 mb-1" />
      <input name="endDate" type="date" value={task.endDate} onChange={handleChange} className="border p-1 mb-1" />
      <input name="duration" placeholder="Duration (days)" value={task.duration} onChange={handleChange} className="border p-1 mb-1" />
      <input name="percent" placeholder="Percent Complete" value={task.percent} onChange={handleChange} className="border p-1 mb-1" />
      <input name="dependencies" placeholder="Dependencies (comma-separated)" value={task.dependencies} onChange={handleChange} className="border p-1 mb-2" />
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-1 rounded">Submit</button>
      <button onClick={()=>setShowModal(false)} className="bg-blue-500 text-white px-4 py-1 rounded">Close</button>
    </div>
  );
}

export default Modal;
