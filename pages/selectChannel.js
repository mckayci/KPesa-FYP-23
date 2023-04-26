import Channels from "../components/Channels";
import { useAuth } from "../hooks/useAuth";

function SelectChannel() {
  const { db } = useAuth();
  return (
    <div className="h-screen overflow-auto w-full text-4xl">
      <Channels db={db} />
    </div>
  );
}

export default SelectChannel;
