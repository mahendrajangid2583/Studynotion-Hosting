import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login";
import Signup from './pages/Signup'
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import OpenRoute from "./components/core/Auth/OpenRoute";
import PrivetRoute from "./components/core/Auth/PrivetRoute";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Settings from "./components/core/Dashboard/Settings";
import Error from './pages/Error';
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";
import { useSelector } from "react-redux";
import MyCourses from "./components/core/Dashboard/MyCourses";
import AddCourse from "./components/core/Dashboard/AddCourse";
import EditCourse from "./components/core/Dashboard/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from './pages/CourseDetails'
import ViewCourses from "./pages/ViewCourses";
import { ACCOUNT_TYPE } from "./utils/constants";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";

function App() {
  const {user} = useSelector((state)=>state.profile);
  return (
    <div className=" relative w-screen min-h-screen bg-richblack-900 flex flex-col font-inter ">
    <Navbar/>
      <Routes>

        <Route path="/" element={<Home/>}/>
        
        <Route path="/catalog/:catalogName" element={<Catalog/>}/>
        <Route path="/courses/:courseId" element={<CourseDetails/>}/>

        <Route 
              path="/login" 
              element={
                <OpenRoute>
                  <Login/>
                </OpenRoute>
              }
            />
        <Route 
              path="/signup"
              element={
                <OpenRoute>
                  <Signup/>
                </OpenRoute>
              }

            />
        <Route 
              path="forgot-password" 
              element={
                <OpenRoute>
                  <ForgotPassword/>
                </OpenRoute>
              
              }
            />
        <Route 
              path="/update-password/:token" 
              element={
                <OpenRoute>
                  <UpdatePassword/>
                </OpenRoute>
              }
            />
        <Route 
              path="/verify-email" 
              element={
                <OpenRoute>
                  <VerifyEmail/>
                </OpenRoute>
              }
            />
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>

        <Route
              
              element={
                <PrivetRoute>
                  <Dashboard/>
                </PrivetRoute>
              } 
            >
              <Route path="/dashboard/my-Profile" element={<MyProfile/>} /> 
              
              <Route path="/dashboard/settings" element ={<Settings/>} />
              
              <Route path="*" element={<Error/>}/>
              {
                
                user?.accountType === "Student" && (
                  <>
                  <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>}/>
                  <Route path="/dashboard/cart" element={<Cart/>}/>
                  </>
                )
              }
              {
                user?.accountType === "Instructor" && (
                  <>
                    <Route path="/dashboard/my-courses" element={<MyCourses/>}/>
                    <Route path="/dashboard/add-course" element={<AddCourse/>}/>
                    <Route path="/dashboard/edit-course/:courseId" element={<EditCourse/>}/>
                    <Route path="/dashboard/instructor" element={<Instructor/>} /> 
                  </>
                )
              }
        </Route>

        <Route
           element={
            <PrivetRoute>
              <ViewCourses/>
            </PrivetRoute>
          }>
           
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route 
                  path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                  element={<VideoDetails/>} 
                />
              </>
            )
          } 

        </Route>



        <Route path="*" element={<Error/>}/>
           

      </Routes>

    </div>
  );
}

export default App;
