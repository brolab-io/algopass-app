const socialIcons = [
  {
    // "facebook": regex fb.me or facebook.com or www.facebook.com or https://m.facebook.com etc.
    icon: "facebook",
    regex:
      /(?:https?:\/\/)?(?:www\.)?(?:facebook|fb)\.(?:com|me)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]*)/,
  },
  {
    icon: "youtube",
    regex:
      /(?:https?:\/\/)?(?:www\.)?(?:youtube)\.(?:com)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]*)/,
  },
  {
    icon: "twitter",
    regex:
      /(?:https?:\/\/)?(?:www\.)?(?:twitter)\.(?:com)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]*)/,
  },
  {
    icon: "instagram",
    regex:
      /(?:https?:\/\/)?(?:www\.)?(?:instagram)\.(?:com)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]*)/,
  },
  {
    icon: "tiktok",
    regex:
      /(?:https?:\/\/)?(?:www\.)?(?:tiktok)\.(?:com)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]*)/,
  },
  {
    icon: "telegram", // "telegram": regex t.me or telegram.me or www.telegram.me or https://t.me etc.
    regex:
      /(?:https?:\/\/)?(?:www\.)?(?:telegram|t)\.(?:me)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]*)/,
  },
];

export const getSocialIconName = (url: string): string => {
  const social = socialIcons.find((social) => social.regex.test(url));
  return social?.icon || "default";
};
