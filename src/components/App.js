import React, { useEffect, useState } from "react";
import { authService } from "../fbase";
import AppRouter from "../components/AppRouter";
import { updateProfile } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    // 인증 상태 변경 감지
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);

        // object의 크기를 줄여 Re-rendering을 용이하게 하자
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: () =>
            updateProfile(user, { displayName: user.displayName }),
        });
      } else {
        setIsLoggedIn(false);
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    console.log(authService.currentUser);
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: () =>
        updateProfile(user, { displayName: user.displayName }),
    });
  };

  return (
    <div>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={isLoggedIn}
          userObj={userObj}
        />
      ) : (
        "Initializing..."
      )}
    </div>
  );
}

export default App;
