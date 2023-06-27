import React, { useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

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
