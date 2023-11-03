"use client";
import { ShieldCheckIcon } from "@heroicons/react/20/solid";
import { open_sans } from "@/app/fonts";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import Textarea from "@/components/UI/Textarea";
import clsx from "clsx";
import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useProfileContext } from "../providers";
import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "@/services/profile.service";
import { useWallet } from "@txnlab/use-wallet";
import Image from "next/image";
import { toast } from "react-toastify";
import useUpdateProfile from "@/hooks/useUpdateProfile";
<<<<<<< HEAD
import PageTitle from "@/components/UI/PageTitle";
=======
>>>>>>> a6e4473 (call contract)

type FormValues = {
  username: string;
  name: string;
  bio: string;
};

const InfomationPage = () => {
  const { activeAccount } = useWallet();
  const profileLink = useMemo(() => {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/@`;
  }, []);
  const { user, refetch } = useProfileContext();

  const { setValue, register, handleSubmit } = useForm<FormValues>();
  const { mutate, isPending } = useUpdateProfile();

  useEffect(() => {
    if (user) {
      if (user.name) {
        setValue("name", user.name);
      }
      if (user.bio) {
        setValue("bio", user.bio);
      }
    }
  }, [setValue, user]);

  const onSubmit = useCallback(
    (data: FormValues) => {
      console.log(user, activeAccount);
      if (!activeAccount) return;
      if (!user) return;
      mutate({
        ...user,
        ...data,
      });
    },
    [mutate, user, activeAccount]
  );

  return (
    <div>
      <PageTitle title="Infomation" subtitle="Update your personal information" />
      <div className="grid lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mt-4 lg:mt-8">
        <div className="space-y-1">
          <span className="block font-bold text-[#27272A]">Avatar</span>
          <div
            className={clsx(
<<<<<<< HEAD
              "w-full aspect-square bg-white relative rounded-lg overflow-hidden"
              // !user?.uri && "border border-dashed"
=======
              "w-full aspect-square bg-white relative rounded-lg overflow-hidden",
              !user?.uri && "border border-dashed"
>>>>>>> a6e4473 (call contract)
            )}
          >
            {/* {user?.uri ? (
              <Image src={user.uri} layout="fill" objectFit="cover" alt="avatar" />
            ) : null} */}
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4 lg:col-span-2">
          <Input
            label="Your Name"
            placeholder="John Doe"
            {...register("name")}
            disabled={isPending}
          />
          <Input
            prefix={profileLink}
            label="Short Link"
            placeholder="johndoe"
            {...register("username")}
            disabled={isPending}
          />
          <Textarea
            rows={5}
            label="Bio"
            placeholder="I'm a developer"
            {...register("bio")}
            disabled={isPending}
          />
          <Button
            isLoading={isPending}
            type="submit"
            icon={<ShieldCheckIcon className="h-[18px]" />}
          >
            Save
          </Button>
        </form>
      </div>
    </div>
  );
};

export default InfomationPage;
