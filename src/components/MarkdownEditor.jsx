import React, { useState,useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import axios from 'axios';

const MarkdownEditor = ({ groupId }) => {
  const [content, setContent] = useState("");
  let obj = {
    groupId:groupId,
    content:content    
  }

   useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get(`https://gleqbackend-production.up.railway.app/markdown/getcontent/${groupId}`, {
          headers: {'Content-Type' : 'application/x-www-form-urlencoded'}
        });
        if (res.data.status) {
          setContent(res.data.content);
        }
      } catch (err) {
        console.error("Error fetching notes:", err);
      }
    };

    fetchNotes();
  }, [groupId]);

  const handleSave = async () => {
    let url = `https://gleqbackend-production.up.railway.app/markdown/dosavecontent`;
    const resp = await axios.post(url,obj,{ headers:{ 'Content-Type' : 'application/x-www-form-urlencoded'}});
    if(resp.data.status) 
      {
       alert(resp.data.msg); 
      }
    else alert(resp.data.msg);
  };

  return (
    <div className="flex flex-col w-full h-[calc(100vh-100px)] px-4 py-2 gap-4">
      <div className="flex-1 bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="px-4 py-2 border-b border-gray-200 bg-blue-950">
          <h3 className="text-white font-semibold text-sm">📝 Rich Text Notes</h3>
        </div>

        <ReactQuill
          value={content}
          onChange={setContent}
          placeholder="Start writing your notes..."
          className="h-[calc(100%-50px)]"
        />
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSave}
          className="bg-blue-950 text-white px-6 py-2 shadow hover:bg-blue-900 transition text-sm disabled:opacity-50 cursor-pointer font-medium rounded-lg"
          
        >
          💾 Save Notes
        </button>
      </div>
    </div>
  );
};

export default MarkdownEditor;
