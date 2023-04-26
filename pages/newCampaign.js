import Image from "next/image.js";
import logo from "../public/images/kpesa-logo-300x300.png";

const newCampaign = () => {
  return (
    <div className="w-screen h-screen relative">
      <Image
        src={logo}
        alt="KPesa logo"
        className="relative mt-10 ml-6 h-28 w-28"
      />
      <div className="relative mt-5 left-6 mx-auto">
        <p className="text-3xl text-kpesa-blue inline-block">
          Let&apos;s begin your&nbsp;
        </p>
        <p className="text-kpesa-alt-blue inline-block text-3xl"> campaign</p>{" "}
        <p className="relative text-3xl text-kpesa-blue inline-block">
          journey
        </p>
      </div>
      <form>
        <div class="mb-6 mt-10 ">
          <label
            for="base-input"
            class="block mb-2 text-sm font-medium text-gray-900 ml-9 "
          >
            Please enter the name of your campaign
          </label>
          <input
            type="text"
            id="base-input"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mx-auto  block w-10/12 p-2.5  focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div class="mb-6 relative ">
          <label
            for="base-input"
            class="block mb-2 text-sm font-medium text-gray-900 ml-9 "
          >
            How much do you hope to raise?
          </label>
          <input
            type="currency"
            id="base-input"
            defaultValue="€"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mx-auto focus:ring-blue-500 focus:border-blue-500 block w-10/12 p-2.5 "
          />
        </div>
        <div>
          <ul class="grid grid-cols-3 row-auto gap-x-5 m-5 max-w-md mx-auto w-3/4">
            <li class="relative">
              <input
                class="sr-only peer"
                type="radio"
                value="yes"
                name="answer"
                id="answer_yes"
              />
              <label
                class="flex bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-kpesa-blue peer-checked:ring-2 peer-checked:border-transparent justify-center py-2"
                for="answer_yes"
              >
                Food
              </label>
            </li>

            <li class="relative">
              <input
                class="sr-only peer"
                type="radio"
                value="no"
                name="answer"
                id="answer_no"
              />
              <label
                class="flex  bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-kpesa-blue peer-checked:ring-2 peer-checked:border-transparent justify-center py-2"
                for="answer_no"
              >
                Agriculture
              </label>
            </li>

            <li class="relative">
              <input
                class="sr-only peer"
                type="radio"
                value="maybe"
                name="answer"
                id="answer_maybe"
              />
              <label
                class="flex bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-kpesa-blue peer-checked:ring-2 peer-checked:border-transparent py-2 justify-center"
                for="answer_maybe"
              >
                property
              </label>
            </li>
            <li class="relative py-4">
              <input
                class="sr-only peer"
                type="radio"
                value="construction"
                name="answer"
                id="answer_construction"
              />
              <label
                class="flex flex-1  bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-kpesa-blue peer-checked:ring-2 peer-checked:border-transparent py-2 justify-center break-words"
                for="answer_construction"
              >
                Construction
              </label>
            </li>
            <li class="relative py-4">
              <input
                class="sr-only peer"
                type="radio"
                value="construction"
                name="answer"
                id="answer_retail"
              />
              <label
                class="flex flex-1  bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-kpesa-blue peer-checked:ring-2 peer-checked:border-transparent py-2 justify-center"
                for="answer_retail"
              >
                Retail
              </label>
            </li>
            <li class="relative py-4">
              <input
                class="sr-only peer"
                type="radio"
                value="construction"
                name="answer"
                id="answer_education"
              />
              <label
                class="flex flex-1  bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-kpesa-blue peer-checked:ring-2 peer-checked:border-transparent py-2 justify-center"
                for="answer_education"
              >
                Education
              </label>
            </li>
          </ul>
          <div class="mb-6 mt-5 ">
            <label
              for="base-input"
              class="block mb-2 text-sm font-medium text-gray-900 ml-9 "
            >
              Help your investors by describing the campaign!
            </label>
            <textarea
              type="textarea"
              wrap="hard"
              id="base-input"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mx-auto focus:ring-blue-500 focus:border-blue-500 block w-10/12 p-2.5 overflow-y-scroll whitespace-pre-wrap	"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
export default newCampaign;
