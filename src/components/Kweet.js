import React, { useState } from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { dbService, storageService } from "../fbase";
import { deleteObject, ref } from "firebase/storage";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Kweet = ({ kweetObj, isOwner }) => {
  // editing mode인지 아닌지를 판단
  const [editing, setEditing] = useState(false);
  // editing mode에서 입력한 text를 update
  const [newKweet, setNewKweet] = useState(kweetObj.text);

  const kweetTextRef = doc(dbService, "kweets", `${kweetObj.id}`);
  const urlRef = ref(storageService, kweetObj.attachmentUrl);

  const onDeleteClick = async () => {
    const ok = window.confirm("정말 이 kweet을 삭제하시겠습니까?");

    if (ok) {
      try {
        // 해당하는 kweet을 firestore에서 삭제
        await deleteDoc(kweetTextRef);

        // 삭제하려는 kweet에 img file이 있는 경우 storage에서 삭제
        if (kweetObj.attachmentUrl !== "") {
          await deleteObject(urlRef);
        }
      } catch (error) {
        window.alert("kweet을 삭제하는 데 실패했습니다.");
      }
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
    <div className="kweet">
      {editing ? (
        <>
          <form onSubmit={onSubmitForm} className="container kweetEdit">
            <input
              type="text"
              placeholder="Edit your kweet"
              value={newKweet}
              required
              autoFocus
              onChange={onChangeEdit}
              className="formInput"
            />
            <input type="submit" value="Update Kweet" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{kweetObj.text}</h4>
          {kweetObj.attachmentUrl && (
            <img src={kweetObj.attachmentUrl} alt="image file" />
          )}
          {isOwner && (
            <div className="kweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Kweet;
