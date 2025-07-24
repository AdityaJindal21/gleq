import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import PDFViewer from '../components/PDFViewer';
import MarkdownEditor from '../components/MarkdownEditor';
import ChatBox from '../components/ChatBox';
import Navbar from '../Navbar/Navbar';
import QuestionGenerator from '../components/QuestionGenerator';

const MembersList = ({ members }) => (
  <div className="mt-6">
    <h3 className="text-md font-semibold text-blue-950 mb-3">👥 Members</h3>
    <ul className="space-y-2 text-sm text-gray-700">
      {members.map((m, idx) => (
        <li key={idx} className="bg-white px-3 py-1 rounded shadow-sm">• {m}</li>
      ))}
    </ul>
  </div>
);



const Grouppage = () => {
  const { groupId } = useParams();
  const [groupData, setGroupData] = useState(null);
  const [activeTab, setActiveTab] = useState("markdown");
  const [chatMinimized, setChatMinimized] = useState(false);

  useEffect(() => {
    async function FetchGroupDetails() {
      try {
        const url = `https://gleqbackend-production.up.railway.app/user/get-group?groupId=${groupId}`;
        const resp = await axios.get(url);
        if (resp.data.status) setGroupData(resp.data.group);
        else alert(resp.data.msg);
      } catch (err) {
        alert("Something went wrong!");
      }
    }
    FetchGroupDetails();
  }, [groupId]);

  if (!groupData) return <div className="p-6 text-indigo-700">Loading group details...</div>;

  return (
    <div>
      <Navbar></Navbar>
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 font-sans text-gray-800 overflow-hidden">
      
     
      <div className="w-full md:w-64 p-4 bg-white border-r shadow-md flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-blue-950 mb-1">{groupData.GroupName}</h2>
          <p className="text-sm text-gray-600 mb-4">{groupData.Description}</p>

          <div className="space-y-2">
            <button
              onClick={() => setActiveTab("markdown")}
              className={`block w-full text-left cursor-pointer px-4 py-2 rounded ${activeTab === 'markdown' ? 'bg-blue-950 text-white font-medium' : 'hover:bg-gray-100'}`}
            >
              📝 Study Notes
            </button>
            <button
              onClick={() => setActiveTab("pdf")}
              className={`block w-full text-left cursor-pointer px-4 py-2 rounded ${activeTab === 'pdf' ? 'bg-blue-950 text-white font-medium' : 'hover:bg-gray-100'}`}
            >
              📄 PDF Assistant
            </button>
            <button
              onClick={() => setActiveTab("flashcards")}
              className={`block w-full text-left cursor-pointer px-4 py-2 rounded ${activeTab === 'flashcards' ? 'bg-blue-950 text-white font-medium' : 'hover:bg-gray-100'}`}
            >
              🧠 QuizBuilder AI
            </button>
          </div>
        </div>

        <div className="mt-8 hidden md:block">
          <MembersList members={groupData.members} />
        </div>
      </div>

    
      <div className="flex-1 flex flex-col p-4 overflow-y-auto relative">
        <div className="block md:hidden mb-4">
          <MembersList members={groupData.members} />
        </div>

        {activeTab === "markdown" && <MarkdownEditor groupId = {groupId}/>}
        {activeTab === "pdf" && <PDFViewer groupId={groupId} />}
        {activeTab === "flashcards" && <QuestionGenerator groupId = {groupId}/>}

        <div className="fixed bottom-4 right-4 w-[95%] sm:w-80 lg:w-96 z-50">
          <ChatBox groupId={groupId} minimized={chatMinimized} toggle={() => setChatMinimized(!chatMinimized)} />
        </div>
      </div>
    </div>
    </div>
  );
};

export default Grouppage;
