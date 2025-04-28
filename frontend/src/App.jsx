import React from "react";
import AppRoutes from "../src/routers/AppRoutes";
import { UserProvider } from "./context/user.context";

const App = () => {
  return (
    <UserProvider>

        <AppRoutes />

    </UserProvider>
  );
};

export default App;
