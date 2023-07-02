import React, { useEffect, useState } from "react";
import { dbCollection, dbOnSnapshot, dbService } from "../fbase";
import { query } from "firebase/firestore";

import Kweet from "../components/Kweet";
import KweetForm from "../components/kweetForm";

const Home = ({ userObj }) => {
  const [kweets, setKweets] = useState([]);

  useEffect(() => {
    const q = query(dbCollection(dbService, "kweets"));
    dbOnSnapshot(q, (snapshot) => {
      const kweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(kweetArray);
      setKweets(kweetArray);
    });
  }, []);

  return (
    <div>
      <KweetForm userObj={userObj} />
      <div>
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
