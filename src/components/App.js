import React, { useState } from "react";
import { authService } from "../fbase";
import AppRouter from "../components/AppRouter";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);

  return (
    <div>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; SNS {new Date().getFullYear()}</footer>
    </div>
  );
}

export default App;
