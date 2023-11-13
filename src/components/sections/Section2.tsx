import Image from "next/image";

const Section2 = () => {
  return (
    <div className="bg-[#FAF9F5]">
      <div className="container mx-auto">
        <div className="grid grid-cols-2">
          <div className="mx-auto py-24 sm:py-32">
            <Image
              src={"/assets/images/meeek-home-secondary.png"}
              width={760}
              height={632}
              alt={"Algopass"}
            />
          </div>
          <div className="mx-auto flex items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Customize your profile page in minutes
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Connect your TikTok, Instagram, Twitter, website, store, video,
                music, podcast, events and more. It all comes together in a link
                in bio landing page designed to convert.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2;
