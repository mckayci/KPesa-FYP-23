import classNames from "classnames";
import Link from "next/link";

const Channel = ({ channel }) => {
  const { id, name } = channel;

  return (
    <div className="mt-12">
      <li>
        <Link
          href={`/channel/${id}`}
          className={classNames(
            "flex items-center p-2 font-normal text-gray-900 rounded-lg text-white hover:bg-gray-700"
          )}
        >
          {name}
        </Link>
      </li>
    </div>
  );
};
export default Channel;
