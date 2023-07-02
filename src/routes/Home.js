import React, { useEffect, useState } from "react";
import { authService, dbCollection, dbOnSnapshot, dbService } from "../fbase";
import { query } from "firebase/firestore";

import Kweet from "../components/Kweet";
import KweetForm from "../components/KweetForm";
import { onAuthStateChanged } from "firebase/auth";

const Home = ({ userObj }) => {
  const [kweets, setKweets] = useState([]);

  useEffect(() => {
    const q = query(dbCollection(dbService, "kweets"));
    const unsubscribe = dbOnSnapshot(q, (snapshot) => {
      const kweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setKweets(kweetArray);
    });

    onAuthStateChanged(authService, (user) => {
      if (user == null) {
        unsubscribe();
      }
    });
  }, []);

  return (
    <div className="container">
      <KweetForm userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {kweets.map((kweet) => (
          <Kweet
            key={kweet.id}
            kweetObj={kweet}
            isOwner={kweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
