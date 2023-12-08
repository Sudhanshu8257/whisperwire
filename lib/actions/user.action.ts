"use server";

import {
  addDoc,
  and,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { revalidatePath } from "next/cache";
import result from "postcss/lib/result";

export async function createUser({ clerkId, name, email, picture }: any) {
  try {
    console.log("exist : false");
    const user = await setDoc(doc(db, "users", email), {
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
    const q = query(docRef, limit(3));
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
  userAId: string | undefined | null;
  userBId: string | undefined;
}
export async function sendUserRequest(params: sendUserRequestParams) {
  try {
    const { path, userAId, userBId } = params;
    const docRef = collection(db, "friendRequests");
    await addDoc(docRef, {
      senderId: doc(db, "users", `${userAId}`),
      reciverId: doc(db, "users", `${userBId}`),
      status: "pending",
    });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

interface checkRequestParams {
  userAId: string | undefined | null;
  userBId: string | undefined;
}

export async function checkRequest(params: checkRequestParams) {
  try {
    const { userAId, userBId } = params;
    const q = query(
      collection(db, "friendRequests"),
      and(
        where("reciverId", "==", doc(db, "users", `${userBId}`)),
        where("senderId", "==", doc(db, "users", `${userAId}`))
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
    const result = await getDoc(doc(db, `${userAId}`));
    return result;
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
  userAId: string | undefined | null;
}
export async function fetchRequests(params: fetchRequestsParams) {
  try {
    const { userAId } = params;
    if (userAId === null || userAId === undefined) {
      throw new Error("Try Logging in again");
    }
    const docRef = doc(db, "users", `${userAId}`);
    const q = query(
      collection(db, "friendRequests"),
      where("reciverId", "==", docRef)
    );
    const snapshot = await getDocs(q);
    const requests = [];

    // Wrap the loop in an async function
    for await (const doc of snapshot.docs) {
      const requestData = doc.data();

      // Pre-fetch user data for each request
      const senderDocRef = requestData.senderId;
      const senderData = await getDoc(senderDocRef);

      requests.push({
        ...requestData,
        sender: senderData.data(),
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
