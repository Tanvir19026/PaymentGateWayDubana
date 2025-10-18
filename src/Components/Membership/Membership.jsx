import React, { useEffect, useState, useContext } from "react";
import { PaymentContext } from "../../Context/PaymentContext";

const Membership = () => {
  const [memberships, setMemberships] = useState([]);
  const [selectedOptionId, setSelectedOptionId] = useState("");
  const { handleMembershipSelect } = useContext(PaymentContext);

  // Load membership data
  useEffect(() => {
    fetch("/fakeData.json")
      .then((res) => res.json())
      .then((data) => setMemberships(data))
      .catch((err) => console.error("Error loading membership data:", err));
  }, []);

  // Get the currently selected membership and option
  const getSelected = () => {
    if (!selectedOptionId) return { membership: null, option: null };

    let foundOption = null;
    let foundMembership = null;

    memberships.forEach((m) => {
      m.options.forEach((o) => {
        const optionId = `${m.title}-${o.tag || ""}-${o.price}`;
        if (optionId === selectedOptionId) {
          foundOption = o;
          foundMembership = m;
        }
      });
    });

    return { membership: foundMembership, option: foundOption };
  };

  const { membership, option } = getSelected();

  // Send selected membership + option to context
  useEffect(() => {
    if (membership && option) {
      handleMembershipSelect(membership, option);
    }
  }, [membership, option, handleMembershipSelect]);

  // Cost breakdown for UI
  const costLabel = option
    ? option.tag
      ? `${membership.title} (${option.tag})`
      : membership.title
    : "-";
  const costTotal = option ? `${option.price.toFixed(2)} $` : "0.00 $";

  return (
    <div className="bg-white sm:h-screen sm:w-full lg:h-auto rounded-xl lg:w-[50vw] ps-5">
      <div className="bg-white sm:w-full sm:h-auto lg:w-[44vw] lg:h-[7vh] border-b border-black">
        <p className="pt-2 ps-3 text-xl font-semibold font-roboto">
          1. Select Your Membership
        </p>
      </div>

      <p className="pt-3 pb-3 text-xl font-semibold font-roboto">
        Membership Fee
      </p>

      <form>
        {memberships.map((membershipItem, index) => (
          <div key={index} className="mt-4">
            <label className="text-md font-semibold">{membershipItem.title}</label>

            <div
              className={`mt-4 rounded-lg p-1 sm:w-full sm:h-auto lg:w-[44vw] ${
                membershipItem.outerBorder
                  ? "border border-gray-300"
                  : "border-none"
              }`}
            >
              {membershipItem.options.map((opt) => {
                const optionId = `${membershipItem.title}-${opt.tag || ""}-${opt.price}`;
                const isSelected = selectedOptionId === optionId;

                return (
                  <div
                    key={optionId}
                    className={`bg-white flex justify-between items-center rounded-lg sm:w-full sm:h-auto lg:w-[43vw] border border-gray-300 my-2 transition-all ${
                      isSelected ? "border-[#012077] shadow-md" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2 p-2">
                      <input
                        type="radio"
                        name="membershipOption"
                        value={optionId}
                        checked={isSelected}
                        onChange={(e) => setSelectedOptionId(e.target.value)}
                        className="radio border-[#012077] checked:bg-[#012077]"
                      />
                      <p className="text-md">{opt.title}</p>
                      {opt.tag && (
                        <p className="bg-[#012077] px-3 text-sm text-white rounded-full">
                          {opt.tag}
                        </p>
                      )}
                    </div>
                    <p className="mr-4 text-md font-semibold">
                      {opt.price.toFixed(2)} $
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="w-full h-auto md:w-[44vw] mt-6">
          <div className="border-b pb-2 border-gray-300 w-full h-auto">
            <p className="text-lg font-semibold">Cost Breakdown</p>
          </div>
          <div className="flex justify-between items-center border-b pb-2 mt-2 border-gray-300">
            <p className="text-md">{costLabel}</p>
            <p>{costTotal}</p>
          </div>
          <div className="flex justify-between items-center pb-2 mt-2">
            <p className="font-semibold text-lg">Total Pay</p>
            <p className="font-semibold text-lg">{costTotal}</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Membership;
