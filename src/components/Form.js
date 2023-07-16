import React, { useState } from "react";
import EmailIcon from "../assests/email.png";
import Tick from "../assests/tick.png";
import { BsArrowLeft } from "react-icons/bs";
import { FaFileUpload } from "react-icons/fa";

const Form = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [error, setError] = useState(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/json") {
      setSelectedFile(file);
      setError(null);
    } else {
      setSelectedFile(null);
      setError("Please select a valid JSON file.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = JSON.parse(event.target.result);
        setFileData(fileContent);
        setSuccessModalOpen(true);
      };
      reader.readAsText(selectedFile);
    } else {
      setError("Please select a valid JSON file.");
    }
  };

  const isSubmitDisabled = !selectedFile;

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex items-center gap-5 mb-5">
        <span className="text-2xl font-bold cursor-pointer">
          <BsArrowLeft />
        </span>
        <h1 className="text-2xl font-bold">Submit Form</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="fullName">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            className="border border-gray-300 px-2 py-1 rounded w-full bg-gray-100"
            placeholder="Full Name"
          />
        </div>
        <div className="mb-4 relative">
          <label className="block mb-1" htmlFor="email">
            Email
          </label>
          <div className="relative flex items-center">
            <input
              id="email"
              type="email"
              className="border border-gray-300 px-2 py-1 rounded w-full pr-10 bg-gray-100"
              placeholder="Email"
            />
            <img
              src={EmailIcon}
              alt="email"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        <div className="mb-4 relative">
          <label className="block mb-1" htmlFor="filePicker">
            Upload JSON File
          </label>
          <label
            htmlFor="filePicker"
            className={`border-2  bg-gray-100 border-gray-300 border-dashed px-5 py-7 rounded w-full flex flex-col items-center justify-center cursor-pointer gap-2 ${
              selectedFile ? "bg-gray-100" : ""
            }`}
          >
            <span>
              <FaFileUpload size={24} color="blue" />
            </span>
            <span className="text-gray-500 text-sm">
              {selectedFile ? selectedFile.name : "Browse file"}
            </span>
            <input
              id="filePicker"
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          {error && <p className="text-red-500">{error}</p>}
        </div>

        <div className="mb-4">
          <h2 className="block mb-2">File Contents</h2>

          {fileData ? (
            <pre className="bg-gray-100">
              {JSON.stringify(fileData, null, 2)}
            </pre>
          ) : (
            <div className="h-32 bg-gray-100"></div>
          )}
        </div>

        <button
          type="submit"
          className={`rounded-full w-96 bg-blue-500 text-white px-4 py-2 rounded mx-auto block ${
            isSubmitDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitDisabled}
        >
          Submit
        </button>
      </form>

      {successModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg text-center">
            <img src={Tick} alt="" className="w-36 mx-auto mb-4" />
            <p className="text-lg text-blue-500 font-semibold mb-4">Sucess!</p>
            <p className="text-lg font-semibold mb-4">
              Entries successfully uploaded
            </p>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => setSuccessModalOpen(false)}
                className="bg-blue-500 text-white px-6 py-3 rounded-full"
              >
                Go to My entries
              </button>
              <button
                onClick={() => setSuccessModalOpen(false)}
                className="text-blue-500 px-6 py-3 rounded-full bg-sky-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
