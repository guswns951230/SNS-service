import React, { useEffect, useState } from "react";
import { authService, dbCollection, dbGetDocs, dbService } from "../fbase";
import { useNavigate } from "react-router-dom";
import { orderBy, query, where } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

const Profile = ({ userObj }) => {
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const getMyKweets = async () => {
    const q = query(
      dbCollection(dbService, "kweets"),
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await dbGetDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
  };
  useEffect(() => {
    getMyKweets();
  }, []);

  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };

  const onChangeDisplayName = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(userObj, {
        displayName: newDisplayName,
      });
    }
  };

  return (
    <>
      <form onSubmit={onSubmitForm}>
        <input
          onChange={onChangeDisplayName}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
export default Profile;
