import React, { useEffect, useState } from "react";
import { authService } from "../fbase";
import AppRouter from "../components/AppRouter";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 인증 상태 변경 감지
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <div>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..."}
      <footer>&copy; SNS {new Date().getFullYear()}</footer>
    </div>
  );
}

export default App;
