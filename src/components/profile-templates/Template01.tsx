import { TUser } from "@/utils/supabase";

type Props = {
  profile: TUser;
};

const Template01: React.FC<Props> = ({ profile }) => {
  return (
    <div className="flex items-center justify-center w-full h-full p-4 md:p-6 lg:p-8">
      <div className="w-full max-w-2xl py-8 text-center border rounded-lg md:py-10 lg:py-12">
        <h1 className="text-4xl font-bold">{profile.display_name}</h1>
        <p>@{profile.username}</p>
        <p>{profile.bio}</p>
        <div>
          {profile.social_links.map((link) => (
            <div key={link.id}>
              <a key={link.id} href={link.url} target="_blank" rel="noreferrer">
                {link.title}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Template01;
