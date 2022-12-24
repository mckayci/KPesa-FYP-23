import { useAuth } from "../hooks/useAuth";
import classNames from "classnames";
import Image from "next/image";

const Message = ({ message }) => {
  const { uid, text } = message;
  const { user } = useAuth();
  const isSender = uid === user.uid;

  return (
    <div
      className={classNames("flex mb-4 w-full", {
        "flex-row-reverse": isSender,
        "justify-start": !isSender,
      })}
    >
      <Image
        src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
        class="object-cover h-8 w-8 rounded-full"
        alt=""
      />
      <div
        className={classNames(
          "mx-2 py-3 px-4  rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white",
          { "bg-blue-400": isSender, "bg-green-400": !isSender }
        )}
      >
        {text}
      </div>
    </div>
  );
};
export default Message;
