import React, { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { saveWorkoutPlan, getWorkoutPlan, doSignOut } from '../config/auth';
import DoneIcon from '@mui/icons-material/Done';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const WorkoutPlan = () => {
  const { currentUser, userLoggedIn } = useAuth();
  const navigate = useNavigate();
  const d = new Date();
  let currDay = d.getDay();
  let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  currDay = daysOfWeek[currDay];
  const [selectedDay, setSelectedDay] = useState(`${currDay}`);
  const [workoutPlan, setWorkoutPlan] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: []
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const bodyParts = ['Chest', 'Back', 'Legs', 'Shoulders', 'Biceps', 'Triceps', 'Abs'];

  const loadWorkoutPlan = async () => {
    const plan = await getWorkoutPlan(currentUser.uid);
    if (plan) {
      setWorkoutPlan(plan);
    }
  };

  useEffect(() => {
    if (userLoggedIn) {
      loadWorkoutPlan();
    }
  }, [userLoggedIn]);

  const savePlan = async () => {
    await saveWorkoutPlan(currentUser.uid, workoutPlan);
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const handleAddOrDeleteBodyPart = (bodyPart) => {

    if(workoutPlan[selectedDay] && workoutPlan[selectedDay].find((currPart) => currPart.name === bodyPart))
    {
      handleDeleteBodyPart(selectedDay, bodyPart);
    }

    else
    {
      handleAddBodyPart(bodyPart);
    }

  }

  const handleAddBodyPart = (bodyPart) => {
    const newBodyPart = {
      name: bodyPart,
      exercises: []
    };

    if (!workoutPlan[selectedDay].find((part) => part.name === bodyPart)) {
      setWorkoutPlan((prevPlan) => ({
        ...prevPlan,
        [selectedDay]: [...prevPlan[selectedDay], newBodyPart]
      }));
    }
  };

  const handleAddExercise = (bodyPart) => {
    const newExercise = {
      exerciseName: '',
      sets: []
    };

    setWorkoutPlan((prevPlan) => ({
      ...prevPlan,
      [selectedDay]: prevPlan[selectedDay].map((part) =>
        part.name === bodyPart ? { ...part, exercises: [...part.exercises, newExercise] } : part
      )
    }));
  };

  const handleDeleteBodyPart = (day, bodyPartName) => {
    setWorkoutPlan((prevPlan) => ({
      ...prevPlan,
      [day]: prevPlan[day].filter((part) => part.name !== bodyPartName)
    }));
  };

  const handleDeleteExercise = (day, bodyPart, exerciseIndex) => {
    let tempObj = workoutPlan[selectedDay].find((tempPart) => tempPart.name === bodyPart)
    if(tempObj.exercises.length === 1) handleDeleteBodyPart(selectedDay, bodyPart)
    setWorkoutPlan((prevPlan) => ({
      ...prevPlan,
      [day]: prevPlan[day].map((part) =>
        part.name === bodyPart ? { ...part, exercises: part.exercises.filter((_, i) => i !== exerciseIndex) } : part
      )
    }));
  };

  const handleExerciseChange = (day, bodyPart, exerciseIndex, field, value) => {
    setWorkoutPlan((prevPlan) => ({
      ...prevPlan,
      [day]: prevPlan[day].map((part) =>
        part.name === bodyPart
          ? {
              ...part,
              exercises: part.exercises.map((exercise, i) =>
                i === exerciseIndex ? { ...exercise, [field]: value } : exercise
              )
            }
          : part
      )
    }));
  };

  const handleAddSet = (day, bodyPart, exerciseIndex) => {
    const newSet = { weight: '', reps: '' };
    setWorkoutPlan((prevPlan) => ({
      ...prevPlan,
      [day]: prevPlan[day].map((part) =>
        part.name === bodyPart
          ? {
              ...part,
              exercises: part.exercises.map((exercise, i) =>
                i === exerciseIndex ? { ...exercise, sets: [...exercise.sets, newSet] } : exercise
              )
            }
          : part
      )
    }));
  };

  const handleDeleteSet = (day, bodyPart, exerciseIndex, setIndex) => {
    setWorkoutPlan((prevPlan) => ({
      ...prevPlan,
      [day]: prevPlan[day].map((part) =>
        part.name === bodyPart
          ? {
              ...part,
              exercises: part.exercises.map((exercise, i) =>
                i === exerciseIndex
                  ? { ...exercise, sets: exercise.sets.filter((_, j) => j !== setIndex) }
                  : exercise
              )
            }
          : part
      )
    }));
  };

  const handleSetChange = (day, bodyPart, exerciseIndex, setIndex, field, value) => {
    setWorkoutPlan((prevPlan) => ({
      ...prevPlan,
      [day]: prevPlan[day].map((part) =>
        part.name === bodyPart
          ? {
              ...part,
              exercises: part.exercises.map((exercise, i) =>
                i === exerciseIndex
                  ? {
                      ...exercise,
                      sets: exercise.sets.map((set, j) =>
                        j === setIndex ? { ...set, [field]: value } : set
                      )
                    }
                  : exercise
              )
            }
          : part
      )
    }));
  };

  const handleLogout = async () => {
    await doSignOut();
    navigate('/login');
  };

  if (!userLoggedIn) {
    navigate('/login');
    return null;
  }

  return (
    <div className="w-full flex bg-wholeBg text-white min-h-screen">
      <div
        className={`w-2/5 lg:w-1/4 min-h-screen bg-leftBg transition-transform transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static inset-0 lg:inset-auto z-10 lg:z-auto`}
      >
        <div className="w-2/3 flex justify-center items-center mx-auto mt-10 border-b-4 border-black">
          <img src="/Muscles.png" alt="Gym Boy" className="h-20 w-auto" />
          <div className="flex flex-col justify-end h-24">
            <h1 className="text-black text-2xl mt-6">WORKOUT</h1>
            <h1 className="text-plnrClr text-2xl mb-2">PLANNER</h1>
          </div>
        </div>

        <div className="w-2/3 text-black text-2xl flex justify-start align-center mx-auto mt-10">
        <ArrowRightIcon className="ml-4 mt-1 h-20 w-20" />
        <h2>{currentUser?.displayName}</h2>
        </div>
      </div>
      <div className="w-full lg:w-3/4 ml-auto">
        <div className="flex justify-end items-center mb-4 p-4 w-full">
        <button onClick={toggleSidebar} className="lg:hidden text-btnClr mr-auto z-50">
          {isSidebarOpen ? <CloseIcon className="text-wholeBg" /> : <MenuIcon className="text-white" />}
        </button>
          <button onClick={savePlan} className="bg-btnClr hover:bg-lime-300 mx-6 text-black font-semibold py-2 px-4 rounded">
            Save Plan
          </button>
          <LogoutIcon onClick={handleLogout} className="text-gray-500 hover:text-red-500 cursor-pointer" />
        </div>

      <div className="w-full">
        <div className="w-9/10 mx-auto flex justify-between items-center mb-16">
        {daysOfWeek.map((day) => (
            <button
              key={day}
              onClick={() => handleDayClick(day)}
              className={`px-4 py-2 color-white rounded ${selectedDay === day ? 'border border-white' : null} hover:border hover: border-white`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {selectedDay && (
        <div className="w-full flex justify-around">
        <div className="w-1/5 h-80 bg-black pt-2 flex flex-col justify-center align-center">
        {bodyParts.map((part) => (
          <button
            key={part}
            onClick={() => handleAddOrDeleteBodyPart(part)}
            className={`flex mx-2 mb-2 rounded-lg ${workoutPlan[selectedDay] && workoutPlan[selectedDay].find((currPart) => currPart.name === part) ? 'bg-btnClr text-black' : 'bg-black text-white'}`}
          >
            <DoneIcon className={`ml-2 mt-1 ${workoutPlan[selectedDay] && workoutPlan[selectedDay].find((currPart) => currPart.name === part) ? '' : 'invisible'}`} />
            <span className={`w-3/4 pr-5 py-2 text-sm font-medium`}>
              {part}
            </span>
          </button>
        ))}
      </div>

          <div className="w-3/5">
            { workoutPlan[selectedDay] && workoutPlan[selectedDay].map((bodyPart, partIndex) => (
              // <div key={partIndex} className="mx-auto mb-4 w-full flex flex-col justify-start item-center bg-black rounded-lg">
              <div className="w-full flex flex-col justify-center item-center bg-black rounded-lg mb-4">
              <div key={partIndex} className="mx-auto mb-4 w-full flex justify-center item-center bg-black rounded-lg">
                <div className="w-2/7 mt-3 ml-4 mr-2 text-center">
                  <h4 className=" w-full bg-btnClr text-black text-center rounded-lg text-xl mb-2 px-6 py-2">{bodyPart.name.toUpperCase()}</h4>
                </div>

                {bodyPart.exercises.length ? 
                    null
                    : 
                    (() => {
                        handleAddExercise(bodyPart.name);
                    })()
                }

                <div className="w-2/3 flex flex-col justify-center items-center">

                {bodyPart.exercises && bodyPart.exercises.map((exercise, exIndex) => (
                  <div key={exIndex} className="w-full mt-3 flex flex-col justify-center items-center mb-4">
                    <div className="w-full flex justify-center items-center">
                      <input
                        type="text"
                        placeholder="Exercise Name"
                        value={exercise.exerciseName}
                        onChange={(e) => handleExerciseChange(selectedDay, bodyPart.name, exIndex, 'exerciseName', e.target.value)}
                        className="w-full p-2.5 mr-3 mb-4 text-black rounded-lg border border-gray-700 focus:border-lime-500 focus:outline-none transition duration-300"
                      />
                      <DeleteIcon
                        onClick={() => handleDeleteExercise(selectedDay, bodyPart.name, exIndex)}
                        className="mb-3 text-red-500 hover:text-red-700"
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                    {exercise.sets && exercise.sets.map((set, setIndex) => (
                      <div key={setIndex} className="flex justify-center items-center">
                        <input
                          type="text"
                          placeholder="Weight"
                          value={set.weight}
                          onChange={(e) => handleSetChange(selectedDay, bodyPart.name, exIndex, setIndex, 'weight', e.target.value)}
                          className="w-2/5 p-2 ml-3 mr-3 mb-3 bg-repClr rounded border border-white focus:border-lime-500 focus:outline-none transition duration-300"
                        />
                        <input
                          type="text"
                          placeholder="Reps"
                          value={set.reps}
                          onChange={(e) => handleSetChange(selectedDay, bodyPart.name, exIndex, setIndex, 'reps', e.target.value)}
                          className="w-2/5 p-2 mr-8 mb-3 bg-repClr rounded border border-white focus:border-lime-500 focus:outline-none transition duration-300"
                        />
                        <DeleteIcon
                          onClick={() => handleDeleteSet(selectedDay, bodyPart.name, exIndex, setIndex)}
                          className="text-red-500 mb-2 hover:text-red-700"
                          style={{ cursor: 'pointer' }}
                        />
                      </div>
                    ))}
                    <button
                      onClick={() => handleAddSet(selectedDay, bodyPart.name, exIndex)}
                      className="w-1/3 px-4 py-2 text-sm text-black mt-2 bg-btnClr font-medium rounded"
                    >
                      Add Set
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => handleAddExercise(bodyPart.name)}
                  className="w-1/3 py-2 text-sm mx-auto mb-4 text-black bg-btnClr font-medium rounded"
                >
                  Add Exercise
                </button>
                </div>
              </div>
              
                </div>
            ))}
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default WorkoutPlan;