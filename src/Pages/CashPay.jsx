import { AiOutlineClose } from "react-icons/ai";
import { FaRegFileAlt } from "react-icons/fa";
import { useState } from "react";
import Swal from "sweetalert2";

const CashPay = ({ totalAmount, closeModal }) => {
  const [file, setFile] = useState(null);
  const [notes, setNotes] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    // Save payment confirmation in localStorage
    const paymentData = {
      paymentType: "Cash",
      totalAmount,
      fileName: file?.name || "",
      notes,
      date: new Date().toISOString(),
    };
    localStorage.setItem("paymentConfirmation", JSON.stringify(paymentData));

    // Reset form UI
    setFile(null);
    setNotes("");
Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Payment submitted successfully!",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        })
    // Close modal
    closeModal();


    
  };

  return (
    <div className="w-[620px] h-auto bg-white rounded-lg shadow-lg p-6 flex flex-col gap-6 mx-auto border border-gray-200">
      <div className="flex justify-between items-center border-b border-gray-200 pb-1">
        <h2 className="text-[22px] font-semibold text-gray-900">Cash</h2>
        <AiOutlineClose
          onClick={closeModal}
          className="text-xl cursor-pointer text-gray-700 hover:text-red-500 transition"
        />
      </div>

      <div>
        <p className="text-sm text-gray-600">
          Complete your payment with:{" "}
          <span className="text-[#5F00F5] font-medium cursor-pointer hover:underline">
            Cash
          </span>
        </p>
      </div>

      <div>
        <p className="font-bold text-lg text-black mb-2">Payment Details</p>
        <div className="bg-gray-100 w-full py-3 rounded-md text-center text-gray-600 font-medium">
          Amount to pay
          <br />
          <span className="text-gray-800">{`$${totalAmount.toFixed(2)}`}</span>
        </div>
      </div>

      <div className="border border-red-200 bg-red-50 rounded-md p-4">
        <p className="text-red-700 font-semibold text-sm mb-2">
          How to complete payment:
        </p>
        <ul className="text-gray-700 text-sm list-decimal pl-5 space-y-1">
          <li>Use your preferred online payment method</li>
          <li>Pay the exact amount: ${totalAmount.toFixed(2)}</li>
          <li>Save the payment confirmation</li>
          <li>Upload the receipt below</li>
        </ul>
      </div>

      <div>
        <p className="font-medium text-gray-900 text-sm mb-2">
          Upload Payment Receipt <span className="text-red-500">*</span>{" "}
          <span className="text-xs text-gray-500">(JPG, PNG, PDF. Max 10 MB)</span>
        </p>
        <label className="flex items-center justify-start gap-3 px-3 py-2 cursor-pointer hover:bg-gray-50 transition">
          <span className="text-sm text-black bg-gray-200 rounded-md px-2 py-1">Choose File</span>
          <input type="file" className="hidden" onChange={handleFileChange} />
          <span className="text-xs text-black underline">{file?.name || "No File Chosen"}</span>
        </label>
      </div>

      <div>
        <p className="font-medium text-gray-900 text-sm mb-2">
          Additional Notes <span className="text-gray-400 text-xs">(Optional)</span>
        </p>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Type..."
          className="w-full h-[80px] border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#5F00F5]"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full md:w-[21vw] mx-auto bg-[#012077] hover:bg-[#001a5e] text-white rounded-md py-3 font-medium text-sm transition"
      >
        Submit Payment Proof
      </button>
    </div>
  );
};

export default CashPay;
