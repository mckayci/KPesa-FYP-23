import { useAuth } from "../hooks/useAuth";
import classNames from "classnames";

const Message = ({ message }) => {
  const { uid, text, displayName, createdAt } = message;
  const { user } = useAuth();
  const isSender = uid === user.uid;

  return (
    <div
      className={classNames("flex mb-4 w-full", {
        "flex-row-reverse": isSender,
        "justify-start": !isSender,
      })}
    >
      {/*  <Image
        className="object-cover h-8 w-8 rounded-full"
        src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
        width={1}
        height={1}
        alt=""
      />
    */}
      <div className="flex mb-2">
        <div
          className={classNames(
            "mx-2 py-3 px-4  rounded-bl-3xl rounded-tl-3xl rounded-tr-xl",
            { "bg-kpesa-blue": isSender, "bg-kpesa-alt-blue": !isSender }
          )}
        >
          {!isSender ? (
            <div className={classNames("mt-1 text-white font-bold m text-xs")}>
              {displayName}
            </div>
          ) : (
            ""
          )}

          <div className={classNames("mt-1 text-white")}>{text}</div>
        </div>
      </div>
    </div>
  );
};
export default Message;
