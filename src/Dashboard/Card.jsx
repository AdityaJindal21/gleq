import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GroupIcon } from 'lucide-react';

const Card = ({ groupname, members, desc, groupIcon, groupId }) => {
  const navigate = useNavigate();

  function handleOpen() {
    navigate(`/group/${groupId}`);
  }

  async function handleLeave() {
    const url = `http://localhost:2027/user/leavegroup/${groupId}`;
    const jtoken = localStorage.getItem("studysync_token");

    try {
      const resp = await axios.post(url, {}, {
        headers: { "authorization": `Bearer ${jtoken}` }
      });

      alert(resp.data.msg);
      if (resp.data.status) {
        window.location.reload();
      }
    } catch (error) {
      alert("Error leaving group");
    }
  }

  const [img,setimg] = useState()
  function dogetimage()
  {
    if(groupIcon==="null" || groupIcon==="Image1.png" || groupIcon==="Image2.png" || groupIcon==="nopic.jpg")
    {
      setimg("https://picsum.photos/seed/group/400/200");
    }
    else{
      return setimg(groupIcon);
    }
  }

  useEffect(()=>{
    dogetimage();
  },[])



  return (
    <div className="rounded-2xl shadow-md bg-white overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer max-w-sm">
      <div className="h-32 w-full bg-gray-200">
        <img
          src = {img}
          alt="Group Icon"
          className="h-full w-full object-cover"
        />
      </div>

     
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-blue-950">{groupname}</h3>
        <p className="text-sm text-gray-700">👥 Members: {members}</p>
        <p className="text-sm text-gray-700">📄 {desc}</p>

       
        <div className="flex gap-2 mt-3">
          <button
            type="button"
            onClick={handleOpen}
            className="flex-1 px-4 py-1 text-sm rounded-lg bg-blue-950 text-white hover:bg-blue-900 cursor-pointer font-medium"
          >
            Open
          </button>
          <button
            type="button"
            onClick={handleLeave}
            className="flex-1 px-4 py-1 text-sm rounded-lg bg-blue-950 text-white hover:bg-blue-900 cursor-pointer font-medium"
          >
            Leave Group
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
