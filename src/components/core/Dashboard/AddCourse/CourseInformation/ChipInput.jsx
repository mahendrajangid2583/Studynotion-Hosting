import React, { useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md';
import { useSelector } from 'react-redux';

const ChipInput = (
    {label,
    name,
    placeholder,
    register,
    errors,
    setValue,
    getValues}
) => {

    const [chips, setChips] = useState([]);
    const {editCourse, course} = useSelector((state)=>state.course);
    
    useEffect(()=>{
        if(editCourse){
            setChips(course?.tag.split(","));
        }
        register(name,{require:true, validate: (value)=>value.length>0})
    },[])

   

    const handleKeyDown = (event)=>{
        
        if(event.key === "Enter" || event.key === ","){
            event.preventDefault();
            const chipValue = event.target.value.trim();
            // Check if the input value exists and is not already in the chips array
            if(chipValue && !chips.includes(chipValue)){
                // Add the chip to the array and clear the input
                
                setChips((prev)=>{
                    return (
                        [...prev, chipValue]
                    )
                });
                event.target.value = ""
                console.log(chips);
            }
        }
        
    }
    

    const handleDeleteChip = (chipIndex)=>{
        const newChips = chips.filter((_,index)=>index !== chipIndex)
        setChips(newChips);
    }

    useEffect(()=>{
        setValue(name,chips)
    },[chips])

  return (
    <div className="flex flex-col space-y-2">
    {/* Render the label for the input */}
    <label className="text-sm text-richblack-5" htmlFor={name}>
      {label} <sup className="text-pink-200">*</sup>
    </label>
    {/* Render the chips and input */}
    <div className="flex w-full flex-wrap gap-y-2">
      {/* Map over the chips array and render each chip */}
      {chips.map((chip, index) => (
        <div
          key={index}
          className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5"
        >
          {/* Render the chip value */}
          {chip}
          {/* Render the button to delete the chip */}
          <button
            type="button"
            className="ml-2 focus:outline-none"
            onClick={() => handleDeleteChip(index)}
          >
            <MdClose className="text-sm" />
          </button>
        </div>
      ))}
      {/* Render the input for adding new chips */}
      <input
        id={name}
        name={name}
        type="text"
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        className="form-style w-full"
      />
    </div>
    {/* Render an error message if the input is required and not filled */}
    {errors[name] && (
      <span className="ml-2 text-xs tracking-wide text-pink-200">
        {label} is required
      </span>
    )}
  </div>


  )
}


export default ChipInput