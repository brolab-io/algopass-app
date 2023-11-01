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

type FormValues = {
  username: string;
  display_name: string;
  bio: string;
};

const InfomationPage = () => {
  const { activeAccount } = useWallet();
  const profileLink = useMemo(() => {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/u/`;
  }, []);
  const { user, refetch } = useProfileContext();

  const { setValue, register, handleSubmit } = useForm<FormValues>();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormValues) => updateProfile(activeAccount!.address, data),
    onSuccess: () => {
      refetch();
      toast.success("Update social links successfully");
    },
  });

  useEffect(() => {
    if (user) {
      if (user.display_name) {
        setValue("display_name", user.display_name);
      }
      if (user.username) {
        setValue("username", user.username);
      }
      if (user.bio) {
        setValue("bio", user.bio);
      }
    }
  }, [setValue, user]);

  const onSubmit = useCallback((data: FormValues) => mutate(data), [mutate]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[34px] font-bold space-y-4">Infomation</h1>
          <span className={clsx("text-lg text-[#A5A5A5]", open_sans.className)}>
            Update your personal information
          </span>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mt-4 lg:mt-8">
        <div className="space-y-1">
          <span className="block font-bold text-[#27272A]">Avatar</span>
          <div
            className={clsx(
              "w-full aspect-square bg-white relative rounded-lg overflow-hidden",
              !user?.avatar && "border border-dashed"
            )}
          >
            {user?.avatar ? (
              <Image src={user.avatar} layout="fill" objectFit="cover" alt="avatar" />
            ) : null}
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4 lg:col-span-2">
          <Input label="Display Name" placeholder="John Doe" {...register("display_name")} />
          <Input
            prefix={profileLink}
            label="Short Link"
            placeholder="johndoe"
            {...register("username")}
          />
          <Textarea rows={5} label="Bio" placeholder="I'm a developer" {...register("bio")} />
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
