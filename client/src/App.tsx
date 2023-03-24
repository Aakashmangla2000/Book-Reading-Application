import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./routes/HomePage";
import Book from "./routes/Book";
import AddBook from "./routes/AddBook";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/book/:bookId" Component={Book} />
          <Route path="/addBook" Component={AddBook} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
