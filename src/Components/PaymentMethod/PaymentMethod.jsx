import React, { useEffect, useState, useContext } from "react";


import { PaymentContext } from "../../Context/PaymentContext";
import Swal from "sweetalert2";



const PaymentMethod = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const { selectedPaymentMethod, setPaymentMethod } = useContext(PaymentContext);

  useEffect(() => {
    fetch("/paymentData.json")
      .then((res) => res.json())
      .then((data) => setPaymentMethods(data))
      .catch((err) => console.error("Error loading payment data:", err));
  }, []);

  const handleSelect = (method) => {
    // Update context with selected method
    setPaymentMethod(method);

    // Save to localStorage
    localStorage.setItem("paymentMethod", JSON.stringify(method));

    // Show toast using Swal
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: `Selected ${method.name}`,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
  };

  return (
    <div className="bg-white rounded-xl px-5 pt-5 pb-8 w-full h-auto min-h-[80vh] lg:min-h-[100%] flex flex-col">
      <p className="text-[20px] font-roboto font-semibold pb-4">
        2. Payment Method
      </p>

      <div className="flex flex-col gap-3 flex-1">
        {paymentMethods.map((method, index) => {
          const isSelected = selectedPaymentMethod?.name === method.name;

          return (
            <div
              key={index}
              onClick={() => handleSelect(method)}
              className={`flex justify-between items-center border border-gray-300 rounded-[10px] px-4 h-[60px] hover:shadow-md transition-all cursor-pointer hover:bg-gray-50 ${
                isSelected ? "border-[#012077] shadow-md bg-gray-50" : ""
              }`}
            >
              <p className="font-roboto text-[16px] text-gray-800">
                {method.name}
              </p>
              <img
                src={method.logo}
                alt={method.name}
                className="w-[73px] h-[40px] object-contain"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentMethod;
