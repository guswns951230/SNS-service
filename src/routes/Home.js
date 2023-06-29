import React, { useEffect, useState } from "react";
import {
  dbAddDoc,
  dbCollection,
  dbGetDocs,
  dbOnSnapshot,
  dbService,
} from "../fbase";
import { query } from "firebase/firestore";

const Home = ({ userObj }) => {
  const [kweet, setKweet] = useState("");
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

  const onSubmitForm = async (event) => {
    event.preventDefault();
    try {
      const docRef = await dbAddDoc(dbCollection(dbService, "kweets"), {
        text: kweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
      });
      console.log("Document written with ID : ", docRef);
    } catch (error) {
      console.error("Error adding document : ", error);
    }
    setKweet("");
  };

  const onChangeInput = (event) => {
    const {
      target: { value },
    } = event;
    setKweet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmitForm}>
        <input
          value={kweet}
          onChange={onChangeInput}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Kweet" />
      </form>
      <div>
        {kweets.map((kweet) => (
          <div key={kweet.id}>
            <h4>{kweet.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
