import { useEffect, useRef, useState } from "react";
import {
  collection,
  query,
  limit,
  orderBy,
  addDoc,
  getDocs,
  onSnapshot,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";

import Message from "/components/Message";
import Channels from "/components/Channels";
import { useAuth } from "/hooks/useAuth";
import Channel from "/components/Channel";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import Link from "next/link";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function ChatRoom() {
  const { user, db } = useAuth();
  const {
    query: { id },
    isReady,
  } = useRouter();

  const router = useRouter();

  const { uid, displayName } = user || {};
  const dummySpace = useRef();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [channels, setChannelName] = useState([]);

  useEffect(() => {
    if (isReady) {
      const q = query(collection(db, "channels"));
      const handleSnapshot = (querySnapshot) => {
        const data = querySnapshot.docs.reverse().map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setChannelName(data);
      };
      // load initial docs
      getDocs(q).then(handleSnapshot);

      // Respond to new docs
      onSnapshot(q, handleSnapshot);
    }
  }, [db, id, isReady]);
  const title = channels.find((chat) => chat.id === id);
  const titleName = title ? title.name : "loading";

  const handleSubmit = (e) => {
    e.preventDefault();
    addDoc(collection(db, "messages"), {
      text: newMessage,
      createdAt: new Date(),
      uid,
      displayName: displayName,
      channelId: id,
    }).then((m) => {
      console.log("m", m);
    });

    setNewMessage("");

    dummySpace.current.scrollIntoView({ behaviour: "smooth" });
  };

  console.log("messages", messages);

  useEffect(() => {
    if (isReady) {
      const q = query(
        collection(db, "messages"),
        where("channelId", "==", id),
        orderBy("createdAt", "desc"),
        limit(100)
      );
      const handleSnapshot = (querySnapshot) => {
        const data = querySnapshot.docs.reverse().map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMessages(data);
      };

      // load initial docs
      getDocs(q).then(handleSnapshot);

      // Respond to new docs
      onSnapshot(q, handleSnapshot);
    }
  }, [db, id, isReady]);

  const goBack = () => {
    router.push("/");
  };

  return (
    <main className="flex flex-grow max-h-screen  overflow-auto" id="chat_room">
      <div className="w-1/4  max-sm:hidden text-3xl">
        <Channels db={db} />
      </div>
      <div className="flex flex-col w-full">
        <div class="py-1 px-3 bg-gray-800 text-white text-2xl capitalize  flex flex-row justify-between items-center pb-5 pt-5 object-top sticky">
          <div class="flex items-center">
            <button onClick={goBack} className="sm:hidden">
              <MdOutlineArrowBackIosNew />
            </button>
            <div class="ml-8 text-4xl">{titleName}</div>
          </div>
          <Link href={"/campaign/view"}>
            <div className="flex items-center mr-10">
              <AiFillHome className="text-4xl" />
            </div>
          </Link>
        </div>

        <div class="flex flex-col w-full px-8 py-3 flex-grow h-screen overflow-y-auto sm:px-3">
          {messages.map((message) => (
            <Message message={message} key={message.id} />
          ))}
        </div>
        <form
          className="p-4 flex justify-between space-x-4 sticky mb-2"
          onSubmit={handleSubmit}
        >
          <input
            className="w-full bg-gray-300 py-5 px-3 rounded-xl"
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message here..."
          />
          <button type="submit" disabled={!newMessage}>
            Send
          </button>
        </form>
      </div>
      <section ref={dummySpace}></section>
    </main>
  );
}
