import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Layout from "./Layout";
import TaskForm from "./components/TaskForm";
import Home from "./pages/Home";
import UserForm from "./pages/UserForm";
import AdminForm from "./pages/AdminForm";
import AdminDashboard from "./admin/AdminDashboard";
import { Toaster } from 'react-hot-toast';
import UserDashboard from "./user/UserDashboard";

const App = () => {
  return (
    <>
    <Toaster 
        position="top-center"
        
      />
      <div>
        <BrowserRouter>
          <Routes path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/task-form" element={<TaskForm />} />
            <Route path="/user-login" element={<UserForm/>} />
            <Route path="/user-dashboard" element={<UserDashboard/>} />

          </Routes>

          <Routes>
            <Route path="/admin-login" element={<AdminForm />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />

            </Routes>


        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
