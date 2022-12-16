import { Route, Redirect } from "react-router-dom";
import StorageKeys from "../../../constants/storage-key";

export default function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return localStorage.getItem(StorageKeys.USER) !== null ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
}
