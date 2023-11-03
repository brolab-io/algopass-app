import { buildSocialUrl, extractSocialUrl, getSocialIconName } from "@/utils/social.util";
import { TSocialLink } from "@/utils/supabase";
import Image from "next/image";
import { useMemo } from "react";
import { UserRecord } from "../../contract/AlgopassClient";

type Props = {
  profile: UserRecord;
};

type URLParts = {
  url: string;
  shortname: string;
  name: string;
};

const Template02: React.FC<Props> = ({ profile }) => {
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
          <p className="pt-2 text-2xl font-bold">{profile.name}</p>
          <p className="text-lg font-medium text-black/80">@{profile.name}</p>
          <p className="font-medium text-gray-900">{profile.bio}</p>
        </div>
        <div className="grid items-center grid-cols-5 gap-4 px-4 my-4">
          {socials.map((link, index) => (
            <a href={link.url} key={index}>
              <button className="sticky w-12 h-12 text-2xl duration-1000 transform bg-transparent rounded-full hover:-translate-y-3 hover:bg-black hover:text-white">
                <Image
                  src={`/assets/images/socials/${getSocialIconName(link.url)}.png`}
                  height={64}
                  width={64}
                  alt={link.name || link.url}
                />
              </button>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Template02;
