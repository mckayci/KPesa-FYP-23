import classNames from "classnames";
import Link from "next/link";

const Channel = ({ channel }) => {
  const { id, name } = channel;

  return (
    <li>
      <Link
        href={`/channel/${id}`}
        className={classNames(
          "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
        )}
      >
        {name}
      </Link>
    </li>
  );
};
export default Channel;
