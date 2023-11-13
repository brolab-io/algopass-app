import {
  CalendarDaysIcon,
  ChevronDoubleLeftIcon,
  CircleStackIcon,
  GlobeAsiaAustraliaIcon,
  PhotoIcon,
  PlayCircleIcon,
  RectangleGroupIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const SECTION_DATA = [
  {
    id: 1,
    icon: (
      <GlobeAsiaAustraliaIcon
        width={60}
        height={60}
        className="text-[#03CD69]"
      />
    ),
    label: "Social media icons",
    desc: "Add social media icons block with link to all your social profile and many more.",
  },
  {
    id: 2,
    icon: <PlayCircleIcon width={60} height={60} className="text-[#03CD69]" />,
    label: "YouTube block",
    desc: "Add a YouTube block and display a video from YouTube whenever you want.",
  },
  {
    id: 3,
    icon: (
      <ChevronDoubleLeftIcon
        width={60}
        height={60}
        className="text-[#03CD69]"
      />
    ),
    label: "Custom background",
    desc: "Add background to your header or upload image for your entire every pages.",
  },
  {
    id: 4,
    icon: <CircleStackIcon width={60} height={60} className="text-[#03CD69]" />,
    label: "Link groups",
    desc: "Make groups of your links and categorize for easier navigation in our website.",
  },
  {
    id: 5,
    icon: (
      <RectangleGroupIcon width={60} height={60} className="text-[#03CD69] " />
    ),
    label: "Subscription block",
    desc: "Insert an email block and collect subscribers' emails and watch them in your inbox.",
  },
  {
    id: 6,
    icon: <SparklesIcon width={60} height={60} className="text-[#03CD69]" />,
    label: "Color themes",
    desc: "Choose the overall color appeal of your page from pre-built color from palettes.",
  },
  {
    id: 7,
    icon: (
      <CalendarDaysIcon width={60} height={60} className="text-[#03CD69]" />
    ),
    label: "Link scheduling",
    desc: "Publish or unpublish links automatically by scheduling with our features.",
  },
  {
    id: 8,
    icon: <PhotoIcon width={60} height={60} className="text-[#03CD69]" />,
    label: "Social widgets",
    desc: "Add EmbedSocial's block to embed social media feeds or reviews widgets.",
  },
];

const Section4 = () => {
  return (
    <div className="container mx-auto py-12">
      <h2 className="text-4xl font-bold text-center tracking-tight text-gray-900 sm:text-6xl">
        More than a link in bio page. <br /> A complete creators&lsquo; software
      </h2>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 py-12 gap-10 px-10">
        {SECTION_DATA.map((item, index) => (
          <div
            key={item.id}
            className="text-center space-y-3 px-10 py-12 box-border shadow-lg rounded-xl border-2 border-black shadow-black group"
          >
            <div className="flex justify-center items-center group-hover:animate-bounce">
              {item.icon}
            </div>
            <h3 className="text-2xl font-bold tracking-tight">{item.label}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section4;
