import React from "react";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

function Campaign({ campaign }) {
  const { campaignName, description, target, id, campaignPhoto } = campaign;
  const { imageURL, setImageURL } = useState();
  const { db } = useAuth();

  return (
    <div class="max-w-sm  rounded-lg  m-4 bg-kpesa-blue border-kpesa-blue">
      <Link href={`/campaign/${id}`}>
        <Image
          class="rounded-t-lg max-w-full max-h-full"
          width={400}
          height={400}
          src={campaignPhoto}
          alt=""
        />
      </Link>
      <div class="p-5">
        <a href="#">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-white capitalize">
            {campaignName}
          </h5>
        </a>
        <p class="mb-3 font-normal text-gray-100 truncate">{description}</p>
        <Link
          href={`/campaign/${id}`}
          className={classNames(
            "inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
          )}
        >
          Read more
          <svg
            aria-hidden="true"
            class="w-4 h-4 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default Campaign;
