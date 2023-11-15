"use client";
import { ShieldCheckIcon } from "@heroicons/react/20/solid";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import Textarea from "@/components/UI/Textarea";
import clsx from "clsx";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { useProfileContext } from "../providers";
import { useWallet } from "@txnlab/use-wallet";
import useUpdateProfile from "@/hooks/useUpdateProfile";
import PageTitle from "@/components/UI/PageTitle";
import Image from "next/image";
import { getStorageUrl } from "@/utils/string.util";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { updateAvatar } from "@/services/profile.service";
import useUpdateAvatar from "@/hooks/useUpdateAvatar";

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
  const { mutate: mutateAvatar } = useUpdateAvatar();
  const fileRef = useRef<HTMLInputElement>(null);

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
      if (!activeAccount) return;
      if (!user) return;
      mutate({
        ...user,
        ...data,
      });
    },
    [mutate, user, activeAccount]
  );

  const handleChangeAvatar = useCallback(() => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }, []);

  const handleFileChange = useCallback(async () => {
    if (!activeAccount) return;
    if (!fileRef.current) return;
    const _file = fileRef.current.files?.[0];
    if (!_file) return;
    const formData = new FormData();
    formData.append("file", _file);
    mutateAvatar(formData);
  }, [activeAccount, mutateAvatar]);

  return (
    <div>
      <PageTitle
        title="Infomation"
        subtitle="Update your personal information"
      />
      <div className="grid lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mt-4 lg:mt-8">
        <div className="space-y-1">
          <span className="block font-bold text-[#27272A]">Avatar</span>
          <div
            className={clsx(
              "w-full aspect-square bg-white relative rounded-lg overflow-hidden",
              !user?.wallet && "border border-dashed"
            )}
          >
            {user?.wallet ? (
              <Image
                src={getStorageUrl(user.wallet)}
                layout="fill"
                objectFit="cover"
                alt="avatar"
              />
            ) : null}
            <div className="absolute top-1 right-1">
              <button
                className="bg-gray-100 p-1 rounded-md hover:bg-gray-200 transition-colors duration-300"
                onClick={handleChangeAvatar}
              >
                <PencilSquareIcon
                  width={32}
                  height={32}
                  className="text-indigo-500"
                />
              </button>
              <input
                type="file"
                className="hidden"
                ref={fileRef}
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-4 lg:col-span-2"
        >
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
