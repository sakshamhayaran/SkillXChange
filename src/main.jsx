import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Register_Learner from "./pages/Register_Learner.jsx";
import Register_Tutor from "./pages/Register_Tutor.jsx";
import Login_Learner from "./pages/Login_Learner.jsx";
import Login_Tutor from "./pages/Login_Tutor.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/register_learner",
    element: <Register_Learner />
  },
  {
    path: "/register_tutor",
    element: <Register_Tutor />
  },
  {
    path: "/login_learner",
    element: <Login_Learner />
  },
  {
    path: "/login_tutor",
    element: <Login_Tutor />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} >
      <App />
    </RouterProvider>
  </StrictMode>,
)
