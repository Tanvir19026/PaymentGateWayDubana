import { AiOutlineClose } from "react-icons/ai";
import React, { useState } from "react";
import Swal from "sweetalert2";

const ScanPay = ({ totalAmount, closeModal }) => {
  const [fileName, setFileName] = useState("No File Chosen");
  const [notes, setNotes] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName("No File Chosen");
    }
  };

  const handleSubmit = () => {
    // Save payment info to localStorage
    localStorage.setItem(
      "paymentCompleted",
      JSON.stringify({
        method: "Zelle",
        amount: totalAmount,
        notes,
        receipt: fileName,
      })
    );

      Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Payment submitted successfully!",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        })
    closeModal();
  };

  return (
    <div className="w-[620px] h-auto bg-white rounded-lg shadow-lg p-6 flex flex-col gap-6 mx-auto border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-200 pb-3">
        <h2 className="text-[22px] font-semibold text-gray-900">
          Zelle <span className="text-gray-700">(Scan to Pay)</span>
        </h2>
        <AiOutlineClose
          className="text-xl cursor-pointer text-gray-700 hover:text-red-500 transition"
          onClick={closeModal}
        />
      </div>

      {/* Payment Instructions */}
      <div>
        <p className="text-sm text-gray-600">
          Complete your payment with:{" "}
          <span className="text-[#5F00F5] font-medium cursor-pointer hover:underline">
            Zelle
          </span>
        </p>

        <div className="flex flex-col justify-center items-center mt-5">
          <div className="border border-gray-300 rounded-md p-4">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=ZellePayment"
              alt="Zelle QR"
              className="w-[120px] h-[120px] object-contain"
            />
          </div>
          <p className="text-sm text-[#5F00F5] font-medium mt-2">Zelle</p>
          <p className="text-xs text-gray-500">Scan with your mobile device</p>
        </div>
      </div>

      {/* Payment Details */}
      <div>
        <p className="font-bold text-lg text-gray-900 mb-2">Payment Details</p>
        <div className="bg-gray-100 w-full py-3 rounded-md text-center text-gray-800 font-medium">
          Amount to pay
          <br />
          <span className="text-gray-800">${totalAmount.toFixed(2)}</span>
        </div>
      </div>

      {/* How to complete payment */}
      <div className="border border-red-200 bg-red-50 rounded-md p-4">
        <p className="text-red-700 font-semibold text-sm mb-2">
          How to complete payment:
        </p>
        <ul className="text-gray-700 text-sm list-decimal pl-5 space-y-1">
          <li>Scan the QR code above with your payment app</li>
          <li>Complete the payment for ${totalAmount.toFixed(2)}</li>
          <li>Take a screenshot of the payment confirmation</li>
          <li>Upload the receipt below</li>
        </ul>
      </div>

      {/* Upload Payment Receipt */}
      <div>
        <p className="font-medium text-gray-900 text-sm mb-2">
          Upload Payment Receipt{" "}
          <span className="text-red-500">*</span>{" "}
          <span className="text-xs text-gray-500">
            ( JPG, PNG, PDF. Max 10 MB file)
          </span>
        </p>
        <label className="flex items-center justify-start gap-3 px-3 py-2 cursor-pointer hover:bg-gray-50 transition">
          <span className="text-sm text-black bg-gray-200 rounded-md px-2 py-1">
            Choose File
          </span>
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <span className="text-xs text-black underline">{fileName}</span>
        </label>
      </div>

      {/* Additional Notes */}
      <div>
        <p className="font-medium text-gray-900 text-sm mb-2">
          Additional Notes <span className="text-gray-400 text-xs">(Optional)</span>
        </p>
        <textarea
          placeholder="Type..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full h-[80px] border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#5F00F5]"
        />
      </div>

      {/* Submit Payment */}
      <button
        onClick={handleSubmit}
        className="w-full md:w-[21vw] mx-auto bg-[#012077] hover:bg-[#001a5e] text-white rounded-md py-3 font-medium text-sm transition"
      >
        Submit Payment Proof
      </button>
    </div>
  );
};

export default ScanPay;
