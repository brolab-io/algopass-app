import Container from "@/components/UI/Container";
import Template02 from "@/components/profile-templates/Template02";
import { getProfile } from "@/services/profile.service";
import { Metadata } from "next";

type PageProps = {
  params: {
    wallet: string;
  };
};

export const revalidate = 0;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const profile = await getProfile(params.wallet);

  if (!profile) {
    return {
      title: "This profile was not found",
      description: "Create a bio profile on AlgoPass now!",
    };
  }

  return {
    title: `Visit ${profile.display_name} on AlgoPass`,
    description: `Bio: ${profile.bio}`,
    metadataBase: new URL("https://algopass.vercel.app"),
    openGraph: {
      type: "profile",
      images: profile?.avatar ? profile.avatar : undefined,
      username: profile.username,
      description: `Bio: ${profile.bio}`,
      title: `Visit ${profile.display_name} on AlgoPass`,
    },
    twitter: {
      card: "summary_large_image",
      site: "@algopass",
      title: `Visit ${profile.display_name} on AlgoPass`,
      description: `Bio: ${profile.bio}`,
      images: profile?.avatar ? profile.avatar : undefined,
    },
  };
}

const ProfilePage = async ({ params }: PageProps) => {
  const profile = await getProfile(params.wallet);
  if (!profile) {
    return <div>Profile not found</div>;
  }
  return (
    <Container className="h-full">
      <Template02 profile={profile} />
    </Container>
  );
};

export default ProfilePage;
