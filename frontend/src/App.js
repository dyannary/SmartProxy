import React from 'react';
import './App.css';
import CourseList from "./Course/CourseList";

function App() {
  return (
      <div className="App">
        <header className="App-header">
          <h1>E-Learning Platform</h1>
          <CourseList />
        </header>
      </div>
  );
}

export default App;
