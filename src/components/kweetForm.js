import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { dbAddDoc, dbCollection, dbService, storageService } from "../fbase";

const KweetForm = ({ userObj }) => {
  const [kweet, setKweet] = useState("");
  const [attachment, setAttachment] = useState("");

  const onSubmitForm = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(
        attachmentRef,
        attachment,
        "data_url"
      );
      attachmentUrl = await getDownloadURL(response.ref);
    }
    const kweetObj = {
      text: kweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbAddDoc(dbCollection(dbService, "kweets"), kweetObj);
    setKweet("");
    setAttachment("");
  };

  const onChangeInput = (event) => {
    const {
      target: { value },
    } = event;
    setKweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => setAttachment("");
  return (
    <form onSubmit={onSubmitForm}>
      <input
        value={kweet}
        onChange={onChangeInput}
        type="text"
        placeholder="What's on your mind?"
        maxLength={120}
      />
      <input type="file" accept="image/*" onChange={onFileChange} />
      <input type="submit" value="Kweet" />
      {attachment && (
        <div>
          <img src={attachment} alt="image file" width="50px" height="50px" />
          <button onClick={onClearAttachment}>Clear</button>
        </div>
      )}
    </form>
  );
};

export default KweetForm;
