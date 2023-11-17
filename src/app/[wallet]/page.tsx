import Container from "@/components/UI/Container";
import Template02 from "@/components/profile-templates/Template02";
import Template03 from "@/components/profile-templates/Template03";
import { getAlgoProfile, getProfile } from "@/services/profile.service";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

type PageProps = {
  params: {
    wallet: string;
  };
};

export const revalidate = 0;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const profile = await getAlgoProfile(params.wallet);

  if (!profile) {
    return {
      title: "This profile was not found",
      description: "Create a bio profile on AlgoPass now!",
    };
  }

  return {
    title: `Visit ${profile.name} on AlgoPass`,
    description: `Bio: ${profile.bio}`,
    metadataBase: new URL("https://algopass.vercel.app"),
    openGraph: {
      type: "profile",
      // images: profile?.avatar ? profile.avatar : undefined,
      // username: profile.username,
      description: `Bio: ${profile.bio}`,
      title: `Visit ${profile.name} on AlgoPass`,
    },
    twitter: {
      card: "summary_large_image",
      site: "@algopass",
      title: `Visit ${profile.name} on AlgoPass`,
      description: `Bio: ${profile.bio}`,
      // images: profile?.avatar ? profile.avatar : undefined,
    },
  };
}

const ProfilePage = async ({ params }: PageProps) => {
  if (!params.wallet.startsWith("%40")) {
    notFound();
  }
  const algoProfile = await getAlgoProfile(params.wallet);
  if (!algoProfile) {
    redirect("/profile-not-exists");
  }

  return (
    <div className="h-full">
      {/* <Template02 profile={algoProfile} wallet={params.wallet} /> */}
      <Template03 profile={algoProfile} wallet={params.wallet} />
    </div>
  );
};

export default ProfilePage;
