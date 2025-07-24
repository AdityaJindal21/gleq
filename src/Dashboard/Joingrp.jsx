import axios from 'axios';
import React from 'react'
import { useState } from 'react'

const Joingrp = ({JoinGroupModel, fetchpods, useremail}) => {
    const [obj,setobj] = useState({
        email: "",
        GroupName: "",
        PassKey: ""
    });
    obj.email = useremail;


    function UpdateContent(event)
    {
        var {name,value} = event.target;
        setobj({...obj,[name]:value});
    }

    async function JoinGroup() {
        let url = `http://localhost:2027/user/join-group`;
         let resp = await axios.post(url,obj,{
            headers:{
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        });
        if(!resp.data.status)
        {
            alert(resp.data.msg);
            JoinGroupModel(false);
        }
        else
        {
            alert(resp.data.msg);
            JoinGroupModel(false);
            fetchpods();
        }
        
    }
    function Join()
    {
        if(!obj.email || !obj.GroupName || !obj.PassKey)
        {
            alert("Please Fill all the Fields")
            return;
        }
        JoinGroup();
    }


  return (
    <>
     <div className="fixed inset-0 bg-white/30 backdrop-blur-sm z-40" onClick={() => JoinGroupModel(false)}
          />

          
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="bg-white w-[90%] max-w-md p-6 rounded-lg shadow-lg relative z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Join a Study Group
              </h2>

              <form className="space-y-4">
                
                <div>
                  <label className="block mb-1 text-sm font-medium">Email</label>
                  <input
                    type="email"
                    name='email'
                    onChange={UpdateContent}
                    value={useremail}
                    disabled
                    readOnly
                    placeholder="your@email.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>

                
                <div>
                    <label className="block mb-1 text-sm font-medium">Group Name</label>
                    <input
                      type="text"
                      name="GroupName"
                      onChange={UpdateContent}
                      placeholder="Study Sync Group"
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-900`}
                    />
                  </div>
               
                <div>
                  <label className="block mb-1 text-sm font-medium">Group Passkey</label>
                  <input
                    type="password"
                    name='PassKey'
                    onChange={UpdateContent}
                    placeholder="Enter the Group passkey"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>

                
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 cursor-pointer"
                    onClick={() => JoinGroupModel(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={Join}
                    className={`px-4 py-2 rounded-md text-white transitionm bg-blue-950 hover:bg-blue-900 cursor-pointer`}
                  >
                      Join
                    </button>

                </div>
              </form>
            </div>
          </div>
          </>
  )
}

export default Joingrp