import useInitProfile from "@/hooks/useInitProfile";
import Container from "../UI/Container";
import Button from "../UI/Button";
import { UserRecord } from "@/contract/AlgopassClient";
import { useForm } from "react-hook-form";
import Input from "../UI/Input";
import Textarea from "../UI/Textarea";
import PageTitle from "../UI/PageTitle";
import Logo from "../UI/Logo";

type FormValues = Pick<UserRecord, "name" | "bio">;

const InitProfile = () => {
  const { mutate, isPending: isInitializing } = useInitProfile();
  const { register, handleSubmit, watch } = useForm<FormValues>();

  const nameLength = watch("name")?.length || 0;
  const bioLength = watch("bio")?.length || 0;

  const onSubmit = handleSubmit((values) =>
    mutate({
      ...values,
      urls: [["email", ""]],
    })
  );

  return (
    <Container className="h-full items-center justify-center flex">
      <form className="w-full max-w-[94%] lg:max-w-xl" onSubmit={onSubmit}>
        <div className="space-y-3 border border-gray-200 p-4 md:p-6 lg:p-8 rounded md:rounded-md lg:rounded-lg">
          <div className="py-1 lg:py-2 space-y-2 lg:space-y-3">
            <Logo />
            <div className="font-bold text-lg md:text-xl lg:text-2xl">Create your profile</div>
          </div>

          <Input
            label="Your name"
            placeholder="Enter your name, e.g. johndoe"
            {...register("name", {
              required: "Name is required",
              maxLength: 15,
            })}
            currentLength={nameLength}
            disabled={isInitializing}
            maxLength={15}
          />
          <Textarea
            label="Bio"
            placeholder="Enter your bio, e.g. I'm a developer"
            {...register("bio", {
              maxLength: 200,
            })}
            disabled={isInitializing}
            currentLength={bioLength}
            rows={4}
            maxLength={200}
          />
          <Button type="submit" isLoading={isInitializing}>
            Create your profile
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default InitProfile;
