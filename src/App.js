import React, { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [error, setError] = useState("");

  const handleAddTask = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== "") {
      // Check if input value is not empty after trimming whitespace
      setTasks([...tasks, inputValue]);
      setInputValue("");
      setError("");
    } else {
      setError("Please enter a task"); // Set error message if input value is empty after trimming whitespace
    }
  };

  const handleEditTask = (index) => {
    setEditIndex(index);
    setInputValue(tasks[index]);
    setError("");
  };

  const handleSaveTask = (index, inputValue) => {
    if (inputValue.trim() !== "") {
      // Check if input value is not empty after trimming whitespace
      const newTasks = tasks.map((task, i) => {
        if (i === index) {
          return inputValue;
        }
        return task;
      });
      setTasks(newTasks);
      setEditIndex(-1);
      setInputValue(""); // Set input value to an empty string after saving the task
      setError("");
    } else {
      setError("Please enter a task"); // Set error message if input value is empty after trimming whitespace
    }
  };

  const handleDeleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
    setError("");
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setError("");
  };

  return (
    <div className="bg-blue-200 min-h-screen">
      <div className="max-w-md mx-auto py-8">
        <h1 className="text-center mb-8 text-3xl text-blue-800 font-bold">
          To-Do List App
        </h1>
        <form className="flex mb-4" onSubmit={handleAddTask}>
          <input
            type="text"
            name="todo"
            placeholder="Add a new task"
            value={inputValue}
            onChange={handleInputChange}
            className="flex-1 px-4 py-2 rounded-l-lg focus:outline-none focus:ring focus:border-blue-400 bg-white"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 px-4 rounded-r-lg text-white font-bold"
          >
            Add
          </button>
        </form>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div>
          {tasks.map((task, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white py-2 px-4 rounded-md shadow-md mb-4"
            >
              <div className="flex items-center">
                <input type="checkbox" className="mr-4" />
                {editIndex === index ? (
                  <input
                    type="text"
                    value={task}
                    onChange={(event) =>
                      handleSaveTask(index, event.target.value)
                    }
                    className="text-lg flex-1 px-2 py-1 rounded-md focus:outline-none focus:ring focus:border-blue-400"
                  />
                ) : (
                  <span className="text-lg">{task}</span>
                )}
              </div>
              <div className="flex items-center">
                {editIndex === index ? (
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md mr-2"
                    onClick={() => handleSaveTask(index, inputValue)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md mr-2"
                    onClick={() => handleEditTask(index)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                  onClick={() => handleDeleteTask(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default App;
