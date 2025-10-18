import { createContext } from "react";

export const PaymentContext = createContext({
      selectedMembership: null,
  selectedOption: null,
  handleMembershipSelect: () => {},
  selectedPaymentMethod: null,
  setPaymentMethod: () => {},
});
