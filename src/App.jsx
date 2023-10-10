import React, { useState, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Events from "./components/Events";
import LoginUser from "./components/LoginUser";
const RegisterUser = lazy(() => import("./components/RegisterUser"));

const App = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div data-testid="app" style={{ backgroundColor: "white" }}>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <LoginUser
                user={user}
                setUser={setUser}
                password={password}
                setPassword={setPassword}
              />
            }
          />
          <Route
            path="/register"
            element={
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
                <RegisterUser user={user} setUser={setUser} />
              </Suspense>
            }
          />
          <Route
            path="/events"
            element={
              <Events user={user} setUser={setUser} setPassword={setPassword} />
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export const TestableApp = App;
export default App;
