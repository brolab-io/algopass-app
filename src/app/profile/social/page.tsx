"use client";

import { open_sans } from "@/app/fonts";
import Input from "@/components/UI/Input";
import { getSocialIconName } from "@/utils/social.util";
import clsx from "clsx";
import Image from "next/image";
import { XMarkIcon, PlusIcon, ShieldCheckIcon } from "@heroicons/react/20/solid";
import { useFieldArray, useForm } from "react-hook-form";
import Button from "@/components/UI/Button";
import { useProfileContext } from "../providers";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateSocialLinks } from "@/services/profile.service";
import { toast } from "react-toastify";

type Social = {
  id?: number;
  url: string;
  title: string;
};

type FormValues = {
  socials: Social[];
};

const SocialPage = () => {
  const { register, control, watch, setValue, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      socials: [
        {
          url: "",
          title: "",
        },
      ],
    },
  });

  const { user, refetch } = useProfileContext();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormValues) => {
      return updateSocialLinks(user!.wallet, data.socials);
    },
    onSuccess: () => {
      refetch();
      toast.success("Update social links successfully");
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "socials",
    control,
  });

  useEffect(() => {
    if (user && user.social_links?.length) {
      setValue("socials", []);
      console.log(user.social_links);
      for (const social of user.social_links) {
        append({
          id: social.id,
          url: social.url,
          title: social.title || "",
        });
      }
    }
  }, [append, remove, setValue, user]);

  const onSubmit = (data: FormValues) => {
    mutate(data);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[34px] font-bold space-y-4">Social Links</h1>
          <span className={clsx("text-lg text-[#A5A5A5]", open_sans.className)}>
            Update your social links
          </span>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-4xl mt-4 space-y-4 transition-all duration-300 lg:mt-8"
      >
        {fields.map((field, index) => {
          const url = watch(`socials.${index}.url`);
          const iconName = getSocialIconName(url);
          return (
            <div className="flex items-end w-full gap-x-2 md:gap-x-3" key={field.id}>
              <div className="w-12 h-12 bg-white rounded aspect-square">
                {iconName && (
                  <Image
                    src={`/assets/images/socials/${iconName}.png`}
                    className="object-contain w-full h-full"
                    alt={iconName}
                    height={64}
                    width={64}
                  />
                )}
              </div>
              <Input
                label="URL"
                placeholder="https://facebook.com/johndoe"
                {...register(`socials.${index}.url`)}
              />
              <Input
                label="Display title"
                placeholder="John Doe"
                {...register(`socials.${index}.title`)}
              />
              <button className="py-2" onClick={() => remove(index)}>
                <XMarkIcon className="w-8 h-8 text-red-400" />
              </button>
            </div>
          );
        })}
        <div className="flex justify-between">
          <button
            className="bg-blue-600/80 text-white px-5 py-2.5 rounded-lg gap-x-2 flex items-center hover:bg-blue-600/90 transition-colors"
            onClick={() =>
              append({
                url: "",
                title: "",
              })
            }
          >
            <PlusIcon className="w-6 h-6" />
            <span>Add more link</span>
          </button>
          <Button
            isLoading={isPending}
            type="submit"
            icon={<ShieldCheckIcon className="h-[18px]" />}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SocialPage;
