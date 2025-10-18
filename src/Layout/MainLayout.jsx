import { useState } from "react";
import Header from "../Components/Header/Header";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import PaymentMethod from "../Components/PaymentMethod/PaymentMethod";
import Membership from "../Components/Membership/Membership";
import PaymentSummery from "../Components/PaymentSummery/PaymentSummery";
import { PaymentContext } from "../Context/PaymentContext";

const MainLayout = () => {
  const [selectedMembership, setSelectedMembership] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
const [selectedPaymentMethod, setPaymentMethod] = useState(null);

  // Called when user selects a membership option
  const handleMembershipSelect = (membershipData, optionData) => {
    setSelectedMembership(membershipData);
    setSelectedOption(optionData);
  };

  return (
    <PaymentContext.Provider
    value={{
    selectedMembership,
    selectedOption,
    handleMembershipSelect,
    selectedPaymentMethod,
    setPaymentMethod,
  }}
    >
      <div className="min-h-screen bg-[#EDF1F3]">
        <nav className="sticky top-0 z-50 bg-white shadow">
          <Navbar />
        </nav>

        <main className="grid grid-cols-12 gap-6 px-4 py-6 section-container">
          <section className="col-span-12">
            <Header />
          </section>

          <aside className="col-span-12 lg:col-span-7">
            <Membership />
          </aside>

          <aside className="col-span-12 lg:col-span-5 ms-3">
            <PaymentMethod />
          </aside>

          <section className="col-span-12">
            <PaymentSummery />
          </section>
        </main>

        <footer>
          <Footer />
        </footer>
      </div>
    </PaymentContext.Provider>
  );
};

export default MainLayout;
