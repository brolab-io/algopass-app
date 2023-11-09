const socialIcons = [
  {
    // "facebook": regex fb.me or facebook.com or www.facebook.com or https://m.facebook.com etc.
    shortname: "fb",
    icon: "facebook",
    regex:
      /(?:https?:\/\/)?(?:www\.)?(?:facebook|fb)\.(?:com|me)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]*)/,
    urlTemplate: "https://www.facebook.com/{username}",
  },
  {
    shortname: "yt",
    icon: "youtube",
    urlTemplate: "https://www.youtube.com/@{username}",
    regex:
      /(?:https?:\/\/)?(?:www\.)?(?:youtube)\.(?:com)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([@\w\-\.]*)/,
  },
  {
    shortname: "tw",
    icon: "twitter",
    regex:
      /(?:https?:\/\/)?(?:www\.)?(?:twitter)\.(?:com)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]*)/,
    urlTemplate: "https://twitter.com/{username}",
  },
  {
    shortname: "ig",
    icon: "instagram",
    regex:
      /(?:https?:\/\/)?(?:www\.)?(?:instagram)\.(?:com)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]*)/,
    urlTemplate: "https://www.instagram.com/{username}",
  },
  {
    shortname: "tt",
    icon: "tiktok",
    regex:
      /(?:https?:\/\/)?(?:www\.)?(?:tiktok)\.(?:com)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([@#\w\-\.]*)/,
    urlTemplate: "https://www.tiktok.com/@{username}",
  },
  {
    shortname: "tg",
    icon: "telegram", // "telegram": regex t.me or telegram.me or www.telegram.me or https://t.me etc.
    regex:
      /(?:https?:\/\/)?(?:www\.)?(?:telegram|t)\.(?:me)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]*)/,
    urlTemplate: "https://t.me/{username}",
  },
  {
    icon: "linkedin",
    shortname: "li",
    urlTemplate: "https://www.linkedin.com/in/{username}",
    // may be have last slash https://www.linkedin.com/in/{username}/
    regex:
      /(?:https?:\/\/)?(?:www\.)?(?:linkedin)\.(?:com)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]*)\/?/,
  },
];

export const getSupportedSocials = () => {
  return socialIcons.map((social) => social.icon);
};

export const getSocialIconName = (url: string): string => {
  const social = socialIcons.find((social) => social.regex.test(url));
  return social?.icon || "default";
};

export const extractSocialUrl = (url: string) => {
  if (url.endsWith("/")) url = url.slice(0, -1);
  const social = socialIcons.find((social) => social.regex.test(url));
  const username = url.match(social?.regex || "")?.[1];
  if (!social || !username) return null;
  return { shortname: social.shortname, username, name: social.icon };
};

export const buildSocialUrl = (shortname: string, username: string) => {
  const social = socialIcons.find((social) => social.shortname === shortname);
  if (!social) return null;
  return social.urlTemplate.replace("{username}", username);
};
