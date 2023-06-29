import React, { useState } from "react";
import { dbAddDoc, dbCollection, dbService } from "../fbase";

const Home = () => {
  const [kweet, setKweet] = useState("");

  const onSubmitForm = async (event) => {
    event.preventDefault();
    try {
      const docRef = await dbAddDoc(dbCollection(dbService, "kweets"), {
        kweet,
        createdAt: Date.now(),
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
    </div>
  );
};
export default Home;
