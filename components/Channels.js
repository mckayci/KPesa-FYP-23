import { useEffect, useState } from "react";
import {
  collection,
  query,
  limit,
  orderBy,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import Channel from "./Channel";

export default function Channels({ db, user }) {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "channels"), orderBy("name"), limit(100));

    const handleSnapshot = (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const docId = querySnapshot.docs.map((doc) => ({
        id: doc.id,
      }));
      console.log("docID", data);
      setChannels(data);
    };

    // load initial docs
    getDocs(q).then(handleSnapshot);

    // Respond to new docs
    onSnapshot(q, handleSnapshot);
  }, [db]);

  return (
    <div class="flex flex-col flex-grow h-full py-4 px-3 bg-gray-800 sticky ">
      <ul className="space-y-2">
        {channels.map((channel) => (
          <Channel channel={channel} key={channel.id} />
        ))}
      </ul>
    </div>
  );
}
