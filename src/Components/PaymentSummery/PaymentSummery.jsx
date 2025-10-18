import React, { useContext, useState } from "react";
import { PaymentContext } from "../../Context/PaymentContext";
import CashPay from "../../Pages/CashPay";
import ScanPay from "../../Pages/ScanPay";
import Swal from "sweetalert2";

const PaymentSummery = () => {
  const { selectedMembership, selectedOption, selectedPaymentMethod, setSelectedPaymentMethod } = useContext(PaymentContext);
  const [showModal, setShowModal] = useState(false);

  const formatCurrency = (value) => {
    const num = Number(value);
    return isNaN(num) ? "$0.00" : `$${num.toFixed(2)}`;
  };

  if (!selectedMembership || !selectedOption) {
    return (
      <div className="bg-white w-full rounded-xl shadow-sm md:h-[40vh] h-auto p-5">
        <p className="text-xl font-semibold text-[#032177]">Payment Summary</p>
        <p className="mt-4 text-gray-500">No membership selected yet.</p>
      </div>
    );
  }

  const { title: membershipTitle } = selectedMembership;
  const { price, tag } = selectedOption;
  const tagLower = (tag || "").toLowerCase();

  const installmentCount = 10;
  const perInstallment = tagLower === "upfront" ? price / installmentCount : price;
  const paidInstallments = 1; // Can be dynamic
  const methodFee = selectedPaymentMethod?.cost || 0;

  const totalAmount = perInstallment + methodFee;

  const handlePayNow = () => {
    if (!selectedPaymentMethod) {
      Swal.fire("Error", "Please select a payment method before proceeding!", "error");
      return;
    }

    // Save total and details in localStorage
    localStorage.setItem(
      "paymentDetails",
      JSON.stringify({
        membership: membershipTitle,
        membershipPrice: perInstallment,
        paymentMethod: selectedPaymentMethod.name,
        methodFee,
        totalAmount,
      })
    );

    setShowModal(true);
  };

  // Reset UI after successful payment
  const handlePaymentSuccess = () => {
    setShowModal(false);
    setSelectedPaymentMethod(null); // reset payment method
  };

  return (
    <>
      <div className="bg-white w-full rounded-xl shadow-sm md:h-auto h-auto p-5">
        <p className="text-xl font-semibold text-[#032177]">Payment Summary</p>

        <div className="flex justify-between items-center mt-4 text-gray-700">
          <p>{tagLower === "upfront" ? "Membership Fee Installment" : "Membership Fee"}</p>
          <p>{formatCurrency(tagLower === "upfront" ? perInstallment : price)}</p>
        </div>

        <div className="flex justify-between items-center mt-2 pb-3 border-b border-gray-300 text-gray-700">
          <p>Registered Member</p>
          <p>{membershipTitle}</p>
        </div>

        {/* Preserve existing installment UI */}
        {tagLower === "upfront" && (
          <>
            <div className="mt-4 text-gray-800 font-medium">
              <p>
                Installment Plan: {installmentCount} × {formatCurrency(perInstallment)}
              </p>
            </div>

            <div className="mt-3 bg-blue-50 p-3 rounded-lg">
              <p className="text-[#012077] font-semibold mb-1">Installment Info</p>
              <p>Per Installment: {formatCurrency(perInstallment)}</p>
              <p>Total Installments: {installmentCount}</p>
            </div>

            <div className="mt-3 bg-green-50 p-3 rounded-lg">
              <p className="text-[#012077] font-semibold mb-1">Installment Progress</p>
              <p>
                {paidInstallments}/{installmentCount} = {formatCurrency(perInstallment * paidInstallments)} paid
              </p>
            </div>
          </>
        )}

        {/* Payment Method Fee */}
        {selectedPaymentMethod && (
          <div className="flex justify-between items-center mt-4 text-gray-800 font-medium">
            <p>Payment Method Fee ({selectedPaymentMethod.name})</p>
            <p>{formatCurrency(methodFee)}</p>
          </div>
        )}

        {/* Total Amount */}
        <div className="flex justify-between items-center mt-4 text-gray-800 font-medium">
          <p>Total Payable Amount</p>
          <p>{formatCurrency(totalAmount)}</p>
        </div>

        <button
          onClick={handlePayNow}
          className="w-full text-white bg-[#012077] mt-6 py-2 rounded-lg 
            hover:bg-[#00185f] hover:scale-[1.02] transition-all duration-200"
        >
          Pay Now
        </button>
      </div>

      {/* Modal Popup */}
      {showModal && selectedPaymentMethod && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start pt-20 overflow-auto">
          <div className="relative">
            {selectedPaymentMethod.name.toLowerCase().includes("zelle") ? (
              <ScanPay totalAmount={totalAmount} closeModal={handlePaymentSuccess} />
            ) : (
              <CashPay totalAmount={totalAmount} closeModal={handlePaymentSuccess} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentSummery;
