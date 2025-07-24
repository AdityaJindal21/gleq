import React, { useState } from "react";
import { ArrowRight, X } from "lucide-react";
import LoginForm from "./LoginSignUp/LoginForm";
import SignUpForm from "./LoginSignUp/SignUpForm";
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const navigate = useNavigate();

  const openModal = (signUp = true) => {
    setIsSignUp(signUp);
    setShowModal(true);
  };

  function handleJoin() {
    const loggin = localStorage.getItem('studysync_token');
    
    if(loggin) {
      navigate('/dashboard');
    } else {
      openModal(false);
    }
  }

  return (
    <div className="font-inter bg-gray-50 text-gray-900 min-h-screen">
      
    
      <style>
        {`
          /* Animation for content sliding up */
          @keyframes fadeInUp {
            0% {
              transform: translateY(30px); /* Start 30px below */
              opacity: 0; /* Start as invisible */
            }
            100% {
              transform: translateY(0); /* End at normal position */
             
            }
          }
          
          /* Apply fadeInUp animation */
          .fade-in-up {
            animation: fadeInUp 1s ease-out forwards; /* Customize the duration and timing */
          }
        `}
      </style>

     
      <div className="absolute top-6 right-6 z-20 flex gap-4 fade-in-up">
        <button
          onClick={() => openModal(false)}
          className="bg-gradient-to-r from-blue-950 via-blue-800 to-blue-700 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          Login
        </button>
        {/* <button
          onClick={() => openModal(true)}
          className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-600 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          Sign Up
        </button> */}
      </div>

    
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br">
        <img
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1920&q=80"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
     
        <div className="z-10 text-center max-w-4xl px-6 py-12 bg-white opacity-85 rounded-xl shadow-xl fade-in-up">
          <img 
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" 
          alt="Logo"
          className="h-20 w-20 mx-auto mb-4" 
          />
          <h1 className="text-6xl md:text-7xl font-bold text-indigo-900 mb-4 font-sans">Gleq</h1>
          <p className="text-xl text-gray-700 mb-8">
            Transform your group study with seamless collaboration, real-time tools, and smarter learning.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
           
            <button
              className="bg-blue-950 hover:bg-blue-900 text-white px-6 py-3 rounded-lg text-sm font-medium"
              onClick={handleJoin}
            >
              Join Now
            </button>
            
            <a
              className="bg-blue-900 hover:bg-blue-950 text-white px-6 py-3 rounded-lg text-sm font-medium"
              href="#features"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      
      <section className="py-20 bg-white" id="features">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-blue-950 mb-12 fade-in-up">Smarter Study Tools</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[{
              title: "Markdown Notes",
              img: "https://img.icons8.com/color/96/000000/markdown.png",
              desc: "Create and collaborate on rich-text markdown notes in real time."
            }, {
              title: "Live Chat",
              img: "https://img.icons8.com/color/96/000000/chat.png",
              desc: "Engage instantly with peers through a real-time chat system."
            }, {
              title: "Quizzes & PDFs",
              img: "https://img.icons8.com/color/96/000000/books.png",
              desc: "Upload, share, and test yourself with flashcards and PDFs."
            }].map((item, idx) => (
              <div key={idx} className="text-center p-8 rounded-xl shadow hover:shadow-lg transition bg-gray-50 fade-in-up">
                <img src={item.img} alt={item.title} className="w-20 h-20 mx-auto mb-5" />
                <h3 className="text-xl font-semibold text-blue-950 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="gradient-animate text-white py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-950"></div>
        <div className="relative z-10 px-6 max-w-3xl mx-auto">
          <h2 className="text-4xl font-extrabold mb-4 fade-in-up">Ready to Transform Your Study?</h2>
          <p className="text-lg font-light mb-8 fade-in-up">
            Join thousands of students using StudySync’s cutting-edge tools.
          </p>
          <button
            onClick={handleJoin}
            className="bg-white text-blue-950 font-semibold px-8 py-3 rounded-full flex items-center mx-auto hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:translate-y-1 cursor-pointer"
          >
            Get Started <ArrowRight className="ml-3" size={20} />
          </button>
        </div>
      </section>

      
      <footer className="text-center py-6 text-sm text-gray-500 bg-gray-100">
        © {new Date().getFullYear()} StudySync. All rights reserved.
      </footer>

     
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={22} />
            </button>
           {isSignUp ? (
  <>
  
    <SignUpForm closeModel={() => setShowModal(false)} openModalLogin={() => openModal(false)} />
  </>
) : (
  <>
    <LoginForm closeModellogin={() => setShowModal(false)} openModalSignUp={() => openModal(true)} />
  </>
)}
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
