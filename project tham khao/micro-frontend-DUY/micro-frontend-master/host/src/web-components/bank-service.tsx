import("bank_service/web-components");

declare module JSX {
  namespace JSX {
    interface IntrinsicElements {
      "bank-service": any;
    }
  }
}
const BankService = () => {
  return <bank-service></bank-service>;
};
export default BankService;
