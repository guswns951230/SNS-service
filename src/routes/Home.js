import React, { useEffect, useState } from "react";
import { dbAddDoc, dbCollection, dbGetDocs, dbService } from "../fbase";

const Home = () => {
  const [kweet, setKweet] = useState("");
  const [kweets, setKweets] = useState([]);

  const getKweets = async () => {
    const dbKweets = await dbGetDocs(dbCollection(dbService, "kweets"));
    dbKweets.forEach((document) => {
      // kweet 객체 생성
      const kweetObject = {
        ...document.data(),
        id: document.id,
      };
      // 모든 이전 kweets에 대해 배열(새로 작성한 kweet과 그 이전 것들)을 return
      setKweets((prev) => [kweetObject, ...prev]);
    });
  };

  useEffect(() => {
    getKweets();
  }, []);

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

  console.log(kweets);

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
            <h4>{kweet.kweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
