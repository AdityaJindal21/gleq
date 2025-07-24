import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const PDFViewer = ({ groupId }) => {
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfURL, setPdfURL] = useState("");
  const [summary, setSummary] = useState("");
  const [uploadedPDFs, setUploadedPDFs] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileinputref = useRef(null);

  const jtoken = localStorage.getItem("studysync_token");
  const username = jwtDecode(jtoken).name;

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file?.type !== "application/pdf") {
      alert("Only PDF files allowed.");
      fileinputref.current.value = "";
      return;
    }
    setPdfFile(file);
    setPdfURL(URL.createObjectURL(file)); 
  };

  const handleUpload = async () => {
    if (!pdfFile) return alert("Please select a PDF file");

    const fd = new FormData();
    fd.append("pdf", pdfFile);
    fd.append("groupId", groupId);
    fd.append("uploadedBy", username);
    fd.append("title", pdfFile.name);

    try {
      setUploading(true);
      await axios.post("https://gleqbackend-production.up.railway.app/pdf/upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Uploaded!");
      fileinputref.current.value = "";
      fetchUploadedPDFs();
    } catch (err) {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  function doselectpdf(event)
  {
    let indx = event.target.value;
    const pdff = uploadedPDFs[indx];
    setSelectedPdf(pdff);
    if(pdff)
    {
        setPdfURL(pdff.pdf);
        setSummary(pdff.summary || "");
    }
  }

  async function doSummarize()
  {
    if(!selectedPdf)
    {
      alert("Please Select a PDF");
      return;
    }
    try{
      const res = await axios.post("https://gleqbackend-production.up.railway.app/pdf/summarize",selectedPdf,{
        headers:{
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
      });
      setSummary(res.data.summary || "No summary available");
      setPdfURL(selectedPdf.pdf);
    }catch(err){
      alert("Summary generation failed");

    }
  }

 
  return (
    <div className="h-full border border-gray-200 rounded-xl bg-white shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-indigo-700">📄 PDF Manager</h4>
        <label className="text-sm bg-blue-950 text-white px-3 py-1 rounded-lg cursor-pointer hover:bg-blue-900 font-medium">
          Select PDF
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
            ref={fileinputref}
          />
        </label>
      </div>

      
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="mb-4 bg-blue-950 text-white px-5 py-2 rounded-lg hover:bg-blue-900 text-sm cursor-pointer font-medium"
      >
        {uploading ? "Uploading..." : "Upload PDF"}
      </button>

      <select className="w-full border px-4 py-2 rounded mb-4 text-sm cursor-pointer" onChange={doselectpdf}>
        <option value="" className="cursor-pointer">Select an uploaded PDF</option>
      {
        uploadedPDFs.map((pdf,index)=>(
          <option key={pdf._id} value={index}>{pdf.title} (by {pdf.uploadedBy})
          </option>
        ))
      }
      </select>
     

      
      <button
        className="mb-4 bg-blue-950 text-white px-5 py-2 rounded-lg hover:bg-blue-900 text-sm cursor-pointer font-medium"
        onClick={doSummarize}
      >
        Generate Summary
      </button>

      
      <div className="flex gap-4 h-[450px]">
        <div className="w-1/2 h-full border border-gray-300 rounded-lg bg-white">
          {pdfURL ? (
            <iframe src={pdfURL} className="w-full h-full rounded-lg" />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-gray-400 italic">
              PDF preview will appear here
            </div>
          )}
        </div>
        <div className="w-1/2 h-full border border-gray-300 rounded-lg bg-gray-50 p-4 overflow-y-auto">
          <h5 className="text-sm font-medium mb-2 text-gray-700">AI-Generated Summary</h5>
          <div className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">
            {summary || "The summary will appear here once generated."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
