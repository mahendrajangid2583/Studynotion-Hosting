import React, { useState } from 'react'
import { Chart, registerables } from 'chart.js';
import { Pie } from 'react-chartjs-2';

Chart.register(...registerables);

const InstructorChart = ({courses}) => {

  const [currChart, setCurrChart] = useState("students");

  // function to generate random color
  const getRandomColors = (numColors)=>{
    const colors =[];
    for(let i=0;i<numColors;i++){
      const color = `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`
      colors.push(color);
    }
    return colors;
  }
  

  //create data for chart displaying student info

  const chartDataForStudents = {
    labels: courses.map((course)=> course.courseName),
    datasets:[
      {
        data: courses.map((course)=> course.totalStudentEnrolled),
        backgroundColor : getRandomColors(courses.length),
        
      }
    ]
  }

  //create data for chart displaying income info
  const chartDataForIncome = {
    labels: courses.map((course)=> course.courseName),
    datasets:[
      {
        data: courses.map((course)=> course.totalAmountGenerated),
        backgroundColor : getRandomColors(courses.length),
        
      }
    ]
  }

  //create options

  const options = {
    cutout: '0%',
    maintainAspectRatio: false
  };

  return (
    <div className='flex flex-col gap-y-3 w-full bg-richblack-800 border border-richblack-700 p-4 rounded-md'>
      <p className=" text-lg text-richblack-25 font-semibold">Visualise</p>
      <div className=' flex gap-2'>
        <button
        onClick={()=>setCurrChart("students")}
        className={` text-base font-semibold px-2 py-1 rounded-md
        ${currChart === "students" ? " text-yellow-100 bg-richblack-700"
        :" text-yellow-400 bg-transparent"}`}
        >
          Students
        </button>

        <button
        onClick={()=>setCurrChart("income")}
        className={` text-base font-semibold px-2 py-1 rounded-md
        ${currChart !== "students" ? " text-yellow-100 bg-richblack-700"
        :" text-yellow-400 bg-transparent"}`}
        >
          Income
        </button>
      </div>
      <div className=''>
        <Pie
          data={currChart === "students" ? chartDataForStudents : chartDataForIncome}
          options={options}
          width="400px"
          height="400px"
          
        />
      </div>
    </div>
  )
}

export default InstructorChart