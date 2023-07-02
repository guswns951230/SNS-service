import React, { useState } from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { dbService, storageService } from "../fbase";
import { deleteObject, ref } from "firebase/storage";

const Kweet = ({ kweetObj, isOwner }) => {
  // editing mode인지 아닌지를 판단
  const [editing, setEditing] = useState(false);
  // editing mode에서 입력한 text를 update
  const [newKweet, setNewKweet] = useState(kweetObj.text);

  const kweetTextRef = doc(dbService, "kweets", `${kweetObj.id}`);
  const urlRef = ref(storageService, kweetObj.attachmentUrl);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this kweet?");
    console.log(ok);
    if (ok) {
      // delete kweet
      await deleteDoc(kweetTextRef);
      await deleteObject(urlRef);
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmitForm = async (event) => {
    event.preventDefault();
    console.log(kweetObj, newKweet);
    await updateDoc(kweetTextRef, { text: newKweet });
    setEditing(false);
  };

  const onChangeEdit = (event) => {
    const {
      target: { value },
    } = event;
    setNewKweet(value);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmitForm}>
            <input
              type="text"
              placeholder="Edit your kweet"
              value={newKweet}
              required
              onChange={onChangeEdit}
            />
            <input type="submit" value="Update Kweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{kweetObj.text}</h4>
          {kweetObj.attachmentUrl && (
            <img
              src={kweetObj.attachmentUrl}
              alt="image file"
              width="50px"
              height="50px"
            />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Kweet</button>
              <button onClick={toggleEditing}>Edit Kweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Kweet;
