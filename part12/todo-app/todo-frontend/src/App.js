import { Routes, Route } from 'react-router-dom';
import './App.css';
import TodoView from './Todos/TodoView'
import Todo from './Todos/Todo';


function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TodoView />} />
        <Route path="/todo/:id" element={<Todo />} />
      </Routes>     
    </div>
  );
}

export default App;
