import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Layout from "./Layout";
import TaskForm from "./components/TaskForm";
import Home from "./pages/Home";
import UserForm from "./pages/UserForm";

const App = () => {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/task-form" element={<TaskForm />} />
            <Route path="/user-login" element={<UserForm/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
