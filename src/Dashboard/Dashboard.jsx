import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import axios from 'axios';
import Card from './Card'
import Joingrp from './Joingrp';
import { jwtDecode } from "jwt-decode"; 
import Navbar from '../Navbar/Navbar';


const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [showJoinGrpModal, setshowJoinGrpModal] = useState(false);
  const [obj, setobj] = useState({
    email:"",
    GroupName: "",
    PassKey:"",
    Description: "",
    GroupIcon: null
  });
  const [groupNameAvailibility, setgroupNameAvailibility] = useState(null);
  const [allpods, setallpods] = useState([]);

  useEffect(()=>{
    
    fetchallpods();
  },[])


  async function fetchallpods() {
    let url = `https://gleqbackend-production.up.railway.app/user/getallpods`;
    let jtoken = localStorage.getItem('studysync_token');
    const serverdata = await axios.post(url,{},{ headers:{"authorization" : `Bearer ${jtoken}`}});
    if(serverdata.data.status) 
      {
        setallpods(serverdata.data.doc);
        setobj({...obj,['email']:serverdata.data.useremail});
      }
    else alert(serverdata.data.msg);
    
  }

  async function CheckNameAvailibility(val)
  {
      let url = `https://gleqbackend-production.up.railway.app/user/CheckNameAvailibility?GroupName=${val}`;
      let resp = await axios.get(url)
      if(resp.data.Availibility==false && resp.data.status==true) setgroupNameAvailibility(false);
      else if(resp.data.Availibility==true && resp.data.status==true)  setgroupNameAvailibility(true);
      else setgroupNameAvailibility(null);

  }
  function Updatecontent(event)
  {
    var {name, value}  = event.target;
    setobj({...obj,[name]:value });

    if(event.target.name=="GroupName")
    {
        if(event.target.value!="")
          CheckNameAvailibility(event.target.value);
        else setgroupNameAvailibility(null);
    }
    
  }
  function UpdatePic(event)
  {
    
     const file = event.target.files[0];
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "studysync_unsigned"); 
  formData.append("folder", "StudySyncAssets"); 

  
  fetch("https://api.cloudinary.com/v1_1/db2d9wtzb/upload", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.secure_url) {
        setobj({ ...obj, GroupIcon: data.secure_url });
        console.log("Image uploaded to Cloudinary:", data.secure_url);
      } else {
        alert("Image upload failed!");
      }
    })
    .catch((err) => {
      console.error("Cloudinary Upload Error:", err);
      alert("Failed to upload image.");
    });
  }
  async function CreateCard()
  {
    let fd = new FormData();
    for(let prop in obj)
    {
      fd.append(prop,obj[prop])
    }
    let url = `https://gleqbackend-production.up.railway.app/user/create-study-pod`;
    let resp = await axios.post(url,fd,{
            headers:{
                'Content-Type' : 'multipart/form-data'
            }
        });
    if(resp.data.status)
    {
      alert(resp.data.msg);
    }
    else
    {
      alert(resp.data.msg);
    }
    setShowModal(false);
    fetchallpods();
    setobj({
    email: "",
    GroupName: "",
    PassKey: "",
    Description: "",
    GroupIcon: null
  });
    
  }

  return (
    <div className="relative font-sans">
      <Navbar></Navbar>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-2">Dashboard</h1>
        <hr className="mb-6 border-gray-300" />

       <div className="flex justify-center gap-6 flex-wrap items-center mt-4">
  <button
    onClick={() => setShowModal(true)}
    className="flex items-center justify-center gap-2 w-48 px-4 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-900 transition cursor-pointer font-medium"
  >
    <Plus size={18} />
    Create Group
  </button>

  <button 
    onClick={() => setshowJoinGrpModal(true)}
    className="w-48 px-4 py-2 bg-blue-950 text-white rounded-md hover:bg-blue-900 transition cursor-pointer font-medium"
  >
    Join Group
  </button>
</div>
      </div>

     
      {showModal && (
        <>
         
          <div
            className="fixed inset-0 bg-white/30 backdrop-blur-sm z-40"
            onClick={() => setShowModal(false)}
          />

          
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="bg-white w-[90%] max-w-md p-6 rounded-lg shadow-lg relative z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Create New Group
              </h2>

              <form className="space-y-4">
               
                <div>
                  <label className="block mb-1 text-sm font-medium">Email</label>
                  <input
                    type="email"
                    name='email'
                    placeholder="your@email.com"
                    value={obj.email}
                    disabled
                    readOnly
                    onChange={Updatecontent}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>

               
                <div>
                    <label className="block mb-1 text-sm font-medium">Group Name</label>
                    <input
                      type="text"
                      name="GroupName"
                      placeholder="Study Sync Group"
                      onChange={Updatecontent}
                      value={obj.GroupName}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2
                      ${groupNameAvailibility === false ? "border-red-500 focus:ring-red-500" : ""}
                      ${groupNameAvailibility === true ? "border-green-500 focus:ring-green-500" : ""}
                      ${groupNameAvailibility === null ? "border-gray-300 focus:ring-blue-900" : ""}
                      `}
                    />
                    {groupNameAvailibility === false && (
                        <p className="text-sm text-red-600 mt-1">❌ This group name is already taken</p>
                      )}
                    {groupNameAvailibility === true && (
                        <p className="text-sm text-green-600 mt-1">✅ This group name is available</p>
                      )}
                  </div>
               
                <div>
                  <label className="block mb-1 text-sm font-medium">Group Passkey</label>
                  <input
                    type="password"
                    name='PassKey'
                    placeholder="Enter a secure passkey"
                    onChange={Updatecontent}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>

               
                <div>
                  <label className="block mb-1 text-sm font-medium">Group Description</label>
                  <textarea
                    placeholder="What is this group about?"
                    name='Description'
                    onChange={Updatecontent}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                    rows={3}
                  ></textarea>
                </div>

               
                <div>
                  <label className="block mb-1 text-sm font-medium">Upload Group Icon</label>
                  <input
                    type="file"
                    name='GroupIcon'
                    accept="image/*"
                    onChange={UpdatePic}
                    className="w-full px-2 py-1 border border-gray-300 rounded-md file:mr-3 file:px-4 file:py-1 file:bg-blue-950 file:text-white file:rounded-md file:border-none hover:file:bg-blue-900"
                  />
                </div>

                
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 cursor-pointer"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={CreateCard}
                    disabled={groupNameAvailibility === false}
                    className={`px-4 py-2 rounded-md text-white transition 
                     ${groupNameAvailibility === false ? "bg-gray-400 cursor-not-allowed" : "bg-blue-950 hover:bg-blue-900 cursor-pointer"}`}
                  >
                      Create
                    </button>

                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {showJoinGrpModal && (<Joingrp JoinGroupModel={setshowJoinGrpModal} fetchpods={fetchallpods} useremail={obj.email}></Joingrp>)}

      
      <hr className="mb-6 border-gray-300 w-full max-w-screen-xl mx-auto" />
       <div className="p-4">

       
      <h2 className="text-xl font-semibold mb-2">
        Your Study Pods
      </h2>
      <br />
     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {
          allpods.map((obj, index) => <Card key={index} groupname={obj.GroupName} members={obj.members.length} desc={obj.Description} groupIcon={obj.GroupIcon} groupId={obj._id}/>)
        }

      </div>
    </div>
    
    </div>
  );
};

export default Dashboard;
