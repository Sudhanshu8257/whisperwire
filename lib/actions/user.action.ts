"use server";
import {
  addDoc,
  and,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { db } from "../firebase";
import { revalidatePath } from "next/cache";
import result from "postcss/lib/result";

export async function createUser({ clerkId, name, email, picture }: any) {
  try {
    console.log("exist : false");
    const user = await setDoc(doc(db, "users", clerkId), {
      id: clerkId,
      email: email,
      profilePic: picture,
      userName: name,
      friends: [],
    });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function fetchUsers() {
  try {
    const users: any = [];
    const docRef = collection(db, "users");
    const q = query(docRef, limit(5));
    const docSnapshot = await getDocs(q);
    docSnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      users.push(doc.data());
    });
    // console.log(users);
    return users;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

interface sendUserRequestParams {
  path: string;
  senderId: string | undefined | null;
  reciverId: string | undefined | null;
}
export async function sendUserRequest(params: sendUserRequestParams) {
  try {
    // add timestamp
    const { path, senderId, reciverId } = params;
    const docRef = collection(db, "friendRequests");
    await addDoc(docRef, {
      senderId: doc(db, "users", `${senderId}`),
      reciverId: doc(db, "users", `${reciverId}`),
      status: "pending",
    });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

interface checkRequestParams {
  senderId: string | undefined | null;
  reciverId: string | undefined | null;
}
export async function checkRequest(params: checkRequestParams) {
  try {
    const { senderId, reciverId } = params;
    if (!reciverId || !senderId) {
      throw new Error("Try Logging in again");
    }
    const q = query(
      collection(db, "friendRequests"),
      and(
        where("reciverId", "==", doc(db, "users", `${reciverId}`)),
        where("senderId", "==", doc(db, "users", `${senderId}`))
      )
    );
    let result = false;
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      result = true;
    });
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

interface fetchUserParams {
  userAId: string | undefined | null;
}
export async function fetchUser(params: fetchUserParams) {
  try {
    const { userAId } = params;
    const result = await getDoc(doc(db, "users", `${userAId}`));
    return result.data();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/*
export async function fetchRequests(params: fetchRequestsParams) {
  try {
    const { userAId } = params;
    const docRef = doc(db, "users", "lohanajoy@gmail.com");
    const q = query(
      collection(db, "friendRequests"),
      where("reciverId", "==", docRef)
    );
    let result: any = [];
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.forEach((doc) => {
        console.log("data: ", doc.data());
      });
    });
    console.log("result  => ", result);
    unsubscribe();
  } catch (error) {
    console.log(error);
    throw error;
  }
}
*/

interface fetchRequestsParams {
  reciverId: string | undefined | null;
}
export async function fetchRequests(params: fetchRequestsParams) {
  try {
    const { reciverId } = params;
    if (reciverId === null || reciverId === undefined) {
      throw new Error("Try Logging in again");
    }
    const docRef = doc(db, "users", `${reciverId}`);
    const q = query(
      collection(db, "friendRequests"),
      where("reciverId", "==", docRef)
    );

    const snapshot = await getDocs(q);
    const requests = [];

    for await (const doc of snapshot.docs) {
      const requestData = doc.data();

      const senderDocRef = requestData.senderId;
      const senderData = await getDoc(senderDocRef);

      requests.push({
        ...requestData,
        sender: senderData.data(),
        ref: doc.id,
      });
    }
    return requests;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const fetch = (pathName: string) => {
  revalidatePath(pathName);
};

interface confirmRequestParams {
  senderId: string | null;
  reciverId: string | null;
  pathName: string;
  reff?: string;
}
export async function confirmRequest(params: confirmRequestParams) {
  // add timestamp
  const { senderId, reciverId, pathName, reff } = params;
  try {
    await runTransaction(db, async (transaction) => {
      const docRef = doc(db, "users", `${senderId}`);
      await transaction.delete(doc(db, "friendRequests", `${reff}`));
      await transaction.update(docRef, {
        friends: arrayUnion(`${reciverId}`),
      });
      const docRef2 = doc(db, "users", `${reciverId}`);
      await transaction.update(docRef2, {
        friends: arrayUnion(`${senderId}`),
      });
    });
    console.log("Transaction successfully committed!");
  } catch (e) {
    console.error("Transaction failed:", e);
  } finally {
    revalidatePath(pathName);
  }
}
interface declineRequestParams {
  pathName: string;
  reff: string;
}
export async function declineRequest(params: declineRequestParams) {
  const { pathName, reff } = params;
  try {
    await runTransaction(db, async (transaction) => {
      await transaction.delete(doc(db, "friendRequests", `${reff}`));
    });
    console.log("Transaction successfully committed!");
  } catch (e) {
    console.error("Transaction failed:", e);
  } finally {
    revalidatePath(pathName);
  }
}

interface declineRequestParams {
  pathName: string;
  reff: string;
}

export async function fetchFriends(params: fetchUserParams) {
  const { userAId } = params;
  try {
    const friends = [];
    const userDoc = await getDoc(doc(db, "users", `${userAId}`));
    const userFriends = userDoc.data()?.friends;
    for await (const friendId of userFriends) {
      const ref = doc(db, "users", `${friendId}`);
      const foe = await getDoc(ref);
      friends.push(foe.data());
    }
    return friends;
  } catch (e) {
    console.error("Fetch failed:", e);
  }
}

export async function deleteFriend(params: confirmRequestParams) {
  const { senderId, reciverId, pathName } = params;
  // what if userA removes Userb in the middle of chatting
  // delete chatroom if present
  try {
    await runTransaction(db, async (transaction) => {
      const docRef = doc(db, "users", `${senderId}`);
      await transaction.update(docRef, {
        friends: arrayRemove(`${reciverId}`),
      });
      const docRef2 = doc(db, "users", `${reciverId}`);
      await transaction.update(docRef2, {
        friends: arrayRemove(`${senderId}`),
      });
    });
    console.log("Transaction successfully committed!");
  } catch (e) {
    console.error("Transaction failed:", e);
  } finally {
    revalidatePath(pathName);
  }
}

interface fetchConversationsPararms {
  currentUserId: string | null | undefined;
}
export async function fetchConversations(params: fetchConversationsPararms) {
  try {
    const { currentUserId } = params;
    const q = query(
      collection(db, "conversations"),
      where("participants", "array-contains", currentUserId)
    );
    const snapshot = await getDocs(q);
    const result = [];
    for await (const docs of snapshot.docs) {
      const requestData = docs.data();
      const participants = requestData.participants;

      const userFriendId = participants?.filter(
        (id: any) => id !== currentUserId
      );
      const userFriendData = await getDoc(doc(db, "users", userFriendId[0]));

      result.push({
        ...requestData,
        userFriend: userFriendData.data(),
        ref: docs.id,
      });
    }
    console.log("results for conversations => ", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

interface sendMessageParams {
  userId: string | undefined | null;
  content: string;
  docId: string | null;
}
export async function sendMessage(params: sendMessageParams) {
  try {
    const { userId, content, docId } = params;
    const batch = writeBatch(db);
    const message = {
      content: content,
      time: serverTimestamp(),

      senderId: doc(db, "users", `${userId}`),
    };
    batch.set(
      doc(collection(db, "conversations", `${docId}`, "messages")),
      message
    );

    const ref = doc(db, "conversations", `${docId}`);
    batch.update(ref, { lastMessage: message });
    await batch.commit();
  } catch (error) {
    console.error(error);
  }
}
interface createConversationParams {
  currentUserId: string | undefined | null;
  userBId: string;
}
export async function createConversation(params: createConversationParams) {
  try {
    const { currentUserId, userBId } = params;
    console.log(params);
    const userBDocRef = doc(db, "users", `${userBId}`);
    const currentUserDocRef = doc(db, "users", `${currentUserId}`);
    const q = query(
      collection(db, "conversations"),
      where("participants", "array-contains", currentUserId)
    );
    let conversationDocRef;
    const docSnapshot = await getDocs(q);

    docSnapshot?.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const docData = doc?.data();
      let foundConversation = docData.participants?.includes(userBId);
      if (foundConversation === true) {
        conversationDocRef = doc?.id;
        return;
      }
    });
    if (!conversationDocRef) {
      let conversation = await addDoc(collection(db, "conversations"), {
        lastMessage: { content: "", senderId: "", time: serverTimestamp() },
        unReadCount: 0,
        participants: [userBId, currentUserId],
      });

      conversationDocRef = conversation.id;
      console.log("conversation created");
    }
    return conversationDocRef;
  } catch (error) {
    console.error(error);
  }
}
