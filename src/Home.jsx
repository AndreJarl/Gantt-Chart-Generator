
import gant from "./assets/gantt.png"
import gant2 from "./assets/gantt2.png"
import { Link } from "react-router-dom";
import FAQ from "./components/Faqs";
function Home() {


  return (
    <>
      <div className=" ml-80 flex flex-col justify-center items-center gap-20  mx-5  overflow-x-auto">
        <div className="flex justify-center items-center gap-3  flex-col  ">
           <p className="text-6xl font-bold text-blue-600 text-center mt-9">Welcome to ACSL Planner</p>
           <p className="text-base font-medium text-center  mx-20 pt-4">Effortlessly Plan, Track, and Manage Your Projects – Transform Complex Timelines into Clear, Actionable Gantt Charts for Seamless Success.</p>
           <img className="w-[750px] mt-4 ml-10 shadow-md rounded border" src={gant2} alt="" srcset="" />
           <Link to="/projects"><button className="bg-yellow-300 px-4 py-2 text-lg shadow-md rounded-md mt-4">Get Started </button></Link>
           </div>

           <div className="flex items-center ml-10 justify-center flex-col gap-4">
              <p className="text-5xl font-normal">What is a Gantt Chart?</p>
              <p className="mx-10">A Gantt chart, commonly used in project management, is one of the most popular and useful ways of showing activities (tasks or events) displayed against time. On the left of the chart is a list of the activities and along the top is a suitable time scale. Each activity is represented by a bar; the position and length of the bar reflects the start date, duration and end date of the activity. </p>
           </div>

           <FAQ/>
      </div>
    </>
  );
}

export default Home;
