import React, { useState,useEffect } from 'react';
import axios from 'axios';

const QuestionGenerator = ({ groupId}) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
const [uploadedPDFs, setUploadedPDFs] = useState([]);
const [selectedPdf, setSelectedPdf] = useState(null);

  

  useEffect(() => {
    fetchUploadedPDFs();
  }, []);

  const fetchUploadedPDFs = async () => {
    try {
      const res = await axios.get(`https://gleqbackend-production.up.railway.app/pdf/group/${groupId}`);
      if (res.data.status) {
        setUploadedPDFs(res.data.doc);
      }
    } catch (err) {
      console.error("Error fetching PDFs", err);
    }
  };

  function doselectpdf(event)
  {
    let indx = event.target.value;
    const pdff = uploadedPDFs[indx];
    setSelectedPdf(pdff);
    if(pdff)
    {
        setQuestions(pdff.questions || "");
    }
  }


  const handleGenerateQuestions = async () => {
    if (!selectedPdf) return;
    setLoading(true);
    try {
       const resp = await axios.post("https://gleqbackend-production.up.railway.app/pdf/generatequestion",selectedPdf,{
            headers:{
                    'Content-Type' : 'application/x-www-form-urlencoded'
                }
          });
      setQuestions(resp.data.questions || []);
    } catch (err) {
      console.error('Error generating questions:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-2xl border border-gray-200">
      <h2 className="text-xl font-bold text-blue-950 mb-6 flex items-center gap-2">
        🧠 Generate Questions from PDF
      </h2>

      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select a PDF
        </label>
        <select
          onChange={doselectpdf}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-blue-950"
        >
          <option value="">-- Select PDF --</option>
          {uploadedPDFs.map((pdf, idx) => (
            <option key={pdf._id} value={idx} >
              {pdf.title} (by {pdf.uploadedBy})
            </option>
          ))}
        </select>
      </div>

      
      <div className="flex justify-end">
        <button
          onClick={handleGenerateQuestions}

          className="bg-blue-950 hover:bg-blue-900 text-white text-sm font-medium px-5 py-2 rounded-lg transition disabled:opacity-50 cursor-pointer"
        >
          {loading ? 'Generating...' : 'Generate Questions'}
        </button>
      </div>

      <div className="mt-6 bg-gray-50 rounded-lg p-5 border border-gray-200 max-h-[300px] overflow-y-auto">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Generated Questions</h4>
       {questions.map((item, idx) => (
  <div key={idx} className="mb-3 p-3 bg-white border rounded shadow">
    <p className="font-semibold text-gray-900">Q{idx + 1}: {item.question}</p>
    <p className="text-gray-700 mt-1">Answer: {item.answer}</p>
  </div>
))}
      </div>
    </div>
  );
};

export default QuestionGenerator;
