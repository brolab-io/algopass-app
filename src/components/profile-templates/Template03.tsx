import { UserRecord } from "@/contract/AlgopassClient";
import {
  buildSocialUrl,
  extractSocialUrl,
  getSocialIconName,
} from "@/utils/social.util";
import { getStorageUrl } from "@/utils/string.util";
import { HandThumbUpIcon, StarIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import { useMemo } from "react";
import Button from "../UI/Button";

type Props = {
  profile: UserRecord;
  wallet: string;
};

type URLParts = {
  url: string;
  shortname: string;
  name: string;
};

const Template03: React.FC<Props> = ({ profile, wallet }) => {
  const { socials } = useMemo(() => {
    const socials: URLParts[] = [];
    profile.urls.forEach((url) => {
      const originURL = buildSocialUrl(...url);
      if (!originURL) return;
      const parts = extractSocialUrl(originURL);
      if (parts) {
        socials.push({
          url: originURL,
          shortname: parts.shortname,
          name: parts.name,
        });
      }
    });
    return {
      socials,
    };
  }, [profile.urls]);
  return (
    <main className="profile-page">
      <section className="relative block h-[500px]">
        <div
          className={clsx(
            "absolute top-0 w-full h-full bg-center bg-cover",
            `bg-[url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80')]`
          )}
        >
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-50 bg-black"
          ></span>
        </div>
        <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-[70px]">
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </section>
      <section className="relative py-16 bg-blueGray-200">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative w-full flex justify-center">
                    <Image
                      alt="..."
                      src={getStorageUrl(wallet.replace("%40", ""))}
                      className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px] bg-white"
                      width={150}
                      height={150}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="py-6 px-3 mt-32 sm:mt-0 flex gap-3 justify-end">
                    <Button
                      className="text-sm bg-green-600 ease-linear transition-all duration-150 hover:bg-green-500"
                      icon={
                        <StarIcon
                          className="text-white"
                          width={22}
                          height={22}
                        />
                      }
                    >
                      Follow
                    </Button>
                    <Button
                      className="text-sm bg-pink-600 ease-linear transition-all duration-150 hover:bg-pink-500"
                      icon={
                        <HandThumbUpIcon
                          className="text-white"
                          width={22}
                          height={22}
                        />
                      }
                    >
                      Like
                    </Button>
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        22
                      </span>
                      <span className="text-sm text-blueGray-400">
                        Follower
                      </span>
                    </div>

                    <div className="lg:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        89
                      </span>
                      <span className="text-sm text-blueGray-400">Like</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
                  {profile.name}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  {profile.bio}
                </div>
                {/* <div className="mb-2 text-blueGray-600 mt-10">
                  <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                  Solution Manager - Creative Tim Officer
                </div>
                <div className="mb-2 text-blueGray-600">
                  <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                  University of Computer Science
                </div> */}
              </div>
              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="grid items-center grid-cols-5 gap-4 px-4 my-4">
                  {socials.map((link, index) => (
                    <a href={link.url} key={index} target="_blank">
                      <button className="sticky w-12 h-12 text-2xl duration-1000 transform bg-transparent rounded-full hover:-translate-y-3 hover:bg-black hover:text-white">
                        <Image
                          src={`/assets/images/socials/${getSocialIconName(
                            link.url
                          )}.png`}
                          height={64}
                          width={64}
                          alt={link.name || link.url}
                        />
                      </button>
                    </a>
                  ))}
                </div>
                {/* <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                      An artist of considerable range, Jenna the name taken by
                      Melbourne-raised, Brooklyn-based Nick Murphy writes,
                      performs and records all of his own music, giving it a
                      warm, intimate feel with a solid groove structure. An
                      artist of considerable range.
                    </p>
                    <a href="#pablo" className="font-normal text-pink-500">
                      Show more
                    </a>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Template03;
