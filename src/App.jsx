import React, { useState, Suspense, lazy } from "react";

import Events from "./components/Events";
import LoginUser from "./components/LoginUser";
const RegisterUser = lazy(() => import("./components/RegisterUser"));

const App = () => {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const getPage = () => {
    switch (page) {
      case "login":
        return (
          <LoginUser
            setPage={setPage}
            user={user}
            setUser={setUser}
            password={password}
            setPassword={setPassword}
          />
        );
      case "register":
        return (
          <Suspense
            fallback={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignSelf: "center",
                }}
              >
                Register user component is loading please wait...
              </div>
            }
          >
            <RegisterUser setPage={setPage} user={user} setUser={setUser} />
          </Suspense>
        );
      case "events":
        return <Events setPage={setPage} user={user} />;
      default:
        <div></div>;
    }
  };
  return (
    <div data-testid="app" style={{ backgroundColor: "white" }}>
      {getPage()}
    </div>
  );
};

export const TestableApp = App;
export default App;
