import("netflix_service/web-components");

declare module JSX {
  namespace JSX {
    interface IntrinsicElements {
      "netflix-service": any;
    }
  }
}
const NetflixService = () => {
  return <netflix-service></netflix-service>;
};
export default NetflixService