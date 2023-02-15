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
} from "firebase/firestore";
import { useRouter } from "next/router";

import Message from "../../components/Message";
import Channels from "../../components/Channels";
import { useAuth } from "../../hooks/useAuth";
import auth from "firebase/auth";

export default function ChatRoom() {
  const { user, db } = useAuth();
  const {
    query: { id },
    isReady,
  } = useRouter();

  const { uid, displayName } = user || {};
  const dummySpace = useRef();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

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

  return (
    <main className="flex flex-grow max-h-full overflow-hidden" id="chat_room">
      <Channels db={db} />
      <div className="flex flex-col w-full">
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
