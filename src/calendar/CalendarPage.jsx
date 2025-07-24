import React, { useState,useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Dialog } from '@headlessui/react';
import Navbar from '../Navbar/Navbar';
import './CustomCalendar.css';
import axios from 'axios';

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventData, setEventData] = useState({ title: '', time: '' });

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

 const fetchEvents = async () => {
  let url = `https://gleqbackend-production.up.railway.app/event/dogetevents`;
  let token = localStorage.getItem("studysync_token");
  const resp = await axios.post(url, {}, {
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });

  if (resp.data.status) {
    const transformed = resp.data.events.reduce((acc, curr) => {
      const key = curr.date;
      if (!acc[key]) acc[key] = [];
      acc[key].push({ title: curr.title, time: curr.time });
      return acc;
    }, {});
    setEvents(transformed);
  } else {
    console.log(resp.data.msg);
  }
};

useEffect(() => {
  fetchEvents();
}, []);

  const handleSaveEvent = async () => {
  const key = selectedDate.toDateString();
  if(!eventData.title || !eventData.time)
  {
    alert("Please fill all the fields");
    return;
  }

  let url = `https://gleqbackend-production.up.railway.app/event/dosaveevent`;
  let obj={
    date:key,
    title:eventData.title,
    time:eventData.time
  }
  let token = localStorage.getItem("studysync_token");
  const resp = await axios.post(url,obj,{ headers:{"authorization" : `Bearer ${token}`,'Content-Type': 'multipart/form-data'}});
  if(resp.data.status)
  {
    alert(resp.data.msg);
  await fetchEvents();
  }else{
    alert(resp.data.msg);
  }
  setIsModalOpen(false);
  setEventData({ title: '', time: '' });
};

const handleDeleteEvent = async (event) => {
  const key = selectedDate.toDateString();
  const confirmDelete = window.confirm(`Are you sure you want to delete "${event.title}" at ${event.time}?`);
  if (!confirmDelete) return;

  let url = `http://localhost:2027/event/dodeleteevent`;
  const obj = {
      date: key,
      title: event.title,
      time: event.time
    };
    
    let token = localStorage.getItem("studysync_token");
    const resp = await axios.post(url,obj,{ headers:{"authorization" : `Bearer ${token}`,'Content-Type': 'multipart/form-data'}});
    if(resp.data.status)
    {
      alert(resp.data.msg);
      await fetchEvents();
    }
    else{
      alert(resp.data.msg);
    }
};

  const renderTileContent = ({ date, view }) => {
    const key = date.toDateString();
    if (view === 'month' && events[key]) {
      return (
        <div className="event-marker">
          {events[key].length}
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-2">
        <h1 className="text-4xl font-extrabold font-poppins text-gray-900 mb-8 text-center tracking-tight">
          📅 Study Calendar
        </h1>

       
        <div className="rounded-xl shadow-xl bg-white p-6">
          <Calendar
            onClickDay={handleDateClick}
            value={selectedDate}
            tileContent={renderTileContent}
            className="custom-calendar"
          />
        </div>

        
        <div className="text-center mt-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="add-event-button text-white cursor-pointer"
          >
            ➕ Add Event for {selectedDate.toDateString()}
          </button>
        </div>

       
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">📖 Events on {selectedDate.toDateString()}</h2>
          {(events[selectedDate.toDateString()] || []).length === 0 ? (
            <p className="text-gray-600">No events scheduled. Add one above.</p>
          ) : (
           (events[selectedDate.toDateString()] || []).map((e, index) => (
            <div key={index} className="event-card m-3 flex items-center justify-between">
             <div>
                <p className="font-semibold text-gray-900">{e.title}</p>
                <p className="text-sm text-gray-600">⏰ {e.time}</p>
                </div>
              <button
                onClick={() => handleDeleteEvent(e)}
                className="ml-4 px-3 py-1 rounded-md bg-blue-950 text-white hover:bg-blue-900 cursor-pointer"
                >
                🗑 Delete Event
                </button>
            </div>
            ))
          )}
        </div>
      </div>

     
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-6">
          <Dialog.Panel className="event-modal bg-white max-w-md w-full">
            <Dialog.Title className="text-xl font-semibold mb-6 text-gray-900">
              ➕ Add Event for {selectedDate.toDateString()}
            </Dialog.Title>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Event Title"
                value={eventData.title}
                onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
                className="w-full"
              />
              <input
                type="time"
                value={eventData.time}
                onChange={(e) => setEventData({ ...eventData, time: e.target.value })}
                className="w-full"
              />
              <button
                onClick={handleSaveEvent}
                className="save-event-button text-white w-full cursor-pointer"
              >
                💾 Save Event
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default CalendarPage;