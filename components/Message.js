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
      <div className="flex mb-2">
        <div
          className={classNames("mx-2 py-3 px-4", {
            "bg-kpesa-blue rounded-bl-3xl rounded-tl-3xl rounded-tr-xl":
              isSender,
            "bg-kpesa-alt-blue rounded-br-3xl rounded-tl-3xl rounded-tr-xl":
              !isSender,
          })}
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
