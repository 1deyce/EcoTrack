import React, { useEffect, useState } from 'react';
import SideBar from './SideBar.1';
import Dashboard from '../../pages/Dashboard';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import "../../App.css";
import axios from 'axios';

const CollectionScheduleHome = () => {
    const [selected, setSelected] = useState();
    const [selectedTime, setSelectedTime] = useState(null);
    const [collectors, setCollectors] = useState([]);
    const [selectedCollector, setSelectedCollector] = useState('');
    const [areas, setAreas] = useState([]);
    const [locations, setLocations] = useState([]);
    const [selectedArea, setSelectedArea] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');

    let footer = <p>Please pick a day.</p>;
    if (selected) {
        footer = <p>You picked {format(selected, 'PP')}.</p>;
    }; 

    const timeSlots = [
        '09:00 AM',
        '10:00 AM',
        '11:00 AM',
        '12:00 PM',
        '13:00 PM',
        '14:00 PM',
        '15:00 PM'
    ];
    
    const handleTimeSelection = (time) => {
        setSelectedTime(time);
    };

    const handleCollectorSelection = (e) => {
        setSelectedCollector(e.target.value);
    }

    const handleAreaSelection = (e) => {
        setSelectedArea(e.target.value);
    };
        
    const handleLocationSelection = (e) => {
        setSelectedLocation(e.target.value);
    };

    const handleSubmit = () => {
        const combinedSubmission = {
            date: selected,
            time: selectedTime,
            collector: selectedCollector,
            area: selectedArea,
            location: selectedLocation
        };

        console.log('Combined Submission:', combinedSubmission);
    };

    useEffect(() => {
        axios.get('/collectors')
            .then((response) => {
                setCollectors(response.data);
                console.log(collectors);
            })
            .catch((error) => {
                console.error('Error retrieving collectors:', error);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        axios.get('/areas')
            .then((response) => {
                setAreas(response.data);
                console.log(areas);
            })
            .catch((error) => {
                console.error('Error retrieving areas:', error);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        axios.get('/locations')
            .then((response) => {
                setLocations(response.data);
                console.log(locations);
            })
            .catch((error) => {
                console.error('Error retrieving locations:', error);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='flex'>
            <div className='basis-[4%] h-[100vh]'>
                <SideBar />
            </div>
        <div className='basis-[96%]'>
            <Dashboard />
            <div className='py-[25px] px-[10px] pl-[20px] z-0 h-[90vh]'>
                <div className="grid grid-cols-2 grid-rows-2 gap-4 h-screen">   
                    <div className="flex col-span-1 bg-paleGreen rounded-xl m-2">
                        <div className='w-1/2 ml-10'>
                            <h1 className='pt-10 text-2xl font-bold pl-5'>Select a date:</h1>
                            <DayPicker
                                mode="single"
                                selected={selected}
                                onSelect={setSelected}
                                footer={footer}
                                className='flex justify-between items-center'
                            /> 
                        </div>
                        <div className='w-1/2 ml-48'>
                            <h1 className="pt-10 text-2xl font-bold text-white pb-4">Select a time:</h1>
                            <ul className="flex flex-col justify-center max-w-[8rem] space-y-4 text-black">
                                {timeSlots.map((timeSlot, index) => (
                                    <li
                                        key={index}
                                        className={`cursor-pointer bg-white text-lg rounded-md h-8 px-2 text-center ${
                                            selectedTime === timeSlot ? 'text-primaryGreen font-bold text-lg border-2 border-primaryGreen' : ''
                                        }`}
                                        onClick={() => handleTimeSelection(timeSlot)}
                                    >
                                        {timeSlot}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="col-span-1 bg-darkGreen rounded-xl text-center m-2 pt-10 space-y-6">
                        <h1 
                            className="text-2xl font-bold text-white px-6"
                        >
                            Assign Collector
                        </h1>
                        <h2 
                            className="text-lg text-gray-300 pb-4 px-6"
                        >
                            Select a Collector:
                        </h2>
                        <select
                            className="w-[80%] block py-2 px-4 rounded-md ml-[88px] border border-black mb-4"
                            value={selectedCollector}
                            onChange={handleCollectorSelection}
                        >
                            {collectors.map((collector) => (
                                <option 
                                    key={collector._id} 
                                    value={collector.name}
                                >
                                    {collector.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-center items-center bg-gray-200 col-span-2 rounded-xl text-center p-10 m-2 max-h-[330px] gap-5">
                        <div className='w-1/3'>
                            <h1 className='pb-2 text-xl font-bold'>Select Area/s for pickup:</h1>
                            <div className='w-full h-56 rounded-xl bg-gray-900 overflow-y-scroll'>
                            {areas.map((area) => (
                                <div key={area.id} className="area-item p-4">
                                <input
                                    type="radio"
                                    id={`area-${area.id}`}
                                    name="area"
                                    value={area.name}
                                    checked={selectedArea === area.id}
                                    onChange={handleAreaSelection}
                                />
                                <label htmlFor={`area-${area.id}`}>
                                    <h2 className="text-lg text-white font-bold">{area.name}</h2>
                                    <p className="text-gray-200">{area.description}</p>
                                </label>
                                </div>
                            ))}
                            </div>
                        </div>
                        <div className='w-1/3'>
                            <h1 className='pb-2 text-xl font-bold'>Select disposal location:</h1>
                            <div className='w-full h-56 rounded-xl bg-gray-900 overflow-y-scroll'>
                            {locations.map((location) => (
                                <div key={location.id} className="location-item p-4">
                                <input
                                    type="radio"
                                    id={`location-${location.id}`}
                                    name="location"
                                    value={location.name}
                                    checked={selectedLocation === location.id}
                                    onChange={handleLocationSelection}
                                />
                                <label htmlFor={`location-${location.id}`}>
                                    <h2 className="text-lg text-white font-bold">{location.name}</h2>
                                    <p className="text-gray-200">{location.address}</p>
                                </label>
                                </div>
                            ))}
                            </div>  
                        </div>
                        <div className='w-1/3 flex justify-center items-center'>
                            <button
                                onClick={handleSubmit}
                                type='submit'
                                className="flex items-center justify-center px-6 w-32 h-12 text-white text-lg rounded-lg bg-gradient-to-r from-black to-primaryGreen shadow-right-bottom transition hover:scale-105 delay-150"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>    
        </div>
        </div>
    );
};

export default CollectionScheduleHome;