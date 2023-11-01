import { getSocialIconName } from "@/utils/social.util";
import { TSocialLink, TUser } from "@/utils/supabase";
import Image from "next/image";
import { useMemo } from "react";

type Props = {
  profile: TUser;
};

const Template02: React.FC<Props> = ({ profile }) => {
  const { socials, links } = useMemo(() => {
    const socials: TSocialLink[] = [];
    const links: TSocialLink[] = [];
    profile.social_links.forEach((link) => {
      const icon = getSocialIconName(link.url);
      if (icon) {
        socials.push(link);
      } else {
        links.push(link);
      }
    });
    return {
      socials,
      links,
    };
  }, [profile.social_links]);
  return (
    <div className="flex items-center justify-center w-full h-full p-4 md:p-6 lg:p-8">
      <div className="flex-col max-w-sm px-4 py-6 mx-auto mb-5 text-black bg-white border-4 border-t-8 border-gray-900 shadow-2xl rounded-3xl">
        <div className="text-center">
          <Image
            className="rounded-full"
            alt="profile pic"
            height={512}
            width={512}
            src="/feng.jpeg"
          />
          <p className="pt-2 text-2xl font-bold">{profile.display_name}</p>
          <p className="text-lg font-medium text-black/80">@{profile.username}</p>
          <p className="font-medium text-gray-900">{profile.bio}</p>
        </div>
        <div className="grid items-center grid-cols-5 gap-4 px-4 my-4">
          {socials.map((link) => (
            <a href={link.url} key={link.id}>
              <button className="sticky w-12 h-12 text-2xl duration-1000 transform bg-transparent rounded-full animate-bounce hover:-translate-y-3 hover:bg-black hover:text-white">
                <Image
                  src={`/assets/images/socials/${getSocialIconName(link.url)}.png`}
                  height={64}
                  width={64}
                  key={link.id}
                  alt={link.title || link.url}
                />
              </button>
            </a>
          ))}
        </div>
        {links.map((link) => (
          <a href={link.url} target="_blank" key={link.id}>
            <div className="flex items-center justify-between h-16 px-4 my-2 border-2 border-b-4 border-l-4 border-black rounded-lg shadow-xl">
              <div className="flex items-center">
                <Image
                  alt="photo"
                  className="w-10 rounded-full"
                  height={1012}
                  width={880}
                  src="https://icon-library.com/images/2018/2298785_oreos-oreo-cookie-adult-costume-hd-png-download.png"
                />
                <div className="ml-2">
                  <div className="text-xs font-semibold">{link.title}</div>
                  <div className="flex text-xs font-light text-gray-600">
                    {link.url}
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Template02;
