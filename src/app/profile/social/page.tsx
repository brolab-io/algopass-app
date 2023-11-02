"use client";

import { open_sans } from "@/app/fonts";
import Input from "@/components/UI/Input";
import { extractSocialUrl, getSocialIconName, getSupportedSocials } from "@/utils/social.util";
import clsx from "clsx";
import Image from "next/image";
import { XMarkIcon, PlusIcon, ShieldCheckIcon } from "@heroicons/react/20/solid";
import { useFieldArray, useForm } from "react-hook-form";
import Button from "@/components/UI/Button";
import { useProfileContext } from "../providers";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

type Social = {
  id?: number;
  url: string;
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
        },
      ],
    },
  });

  const { user, refetch } = useProfileContext();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormValues) => {
      return console.log(data);
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
        });
      }
    }
  }, [append, remove, setValue, user]);

  const onSubmit = (data: FormValues) => {
    const socials = data.socials.map((social) => ({
      id: social.id,
      url: social.url,
      ...extractSocialUrl(social.url),
    }));
    console.log(socials);
    mutate({
      socials,
    });
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
      <div className="grid lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mt-4 lg:mt-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 transition-all duration-300">
          {fields.map((field, index) => {
            const url = watch(`socials.${index}.url`);
            const urlData = extractSocialUrl(url);
            return (
              <div className="flex items-end w-full gap-x-2 md:gap-x-3" key={field.id}>
                <div className="w-12 h-12 bg-white rounded aspect-square">
                  {urlData?.name && (
                    <Image
                      src={`/assets/images/socials/${urlData?.name}.png`}
                      className="object-contain w-full h-full"
                      alt={urlData?.name}
                      height={64}
                      width={64}
                    />
                  )}
                </div>
                <Input
                  label="URL"
                  placeholder="Paste your link here, e.g. https://facebook.com/yourusername"
                  {...register(`socials.${index}.url`)}
                  error={!urlData?.name ? "Invalid URL" : ""}
                  Action={
                    <button type="button" onClick={() => remove(index)}>
                      <XMarkIcon className="w-7 h-7 text-red-400" />
                    </button>
                  }
                />
              </div>
            );
          })}
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-blue-600/80 text-white px-5 py-2.5 rounded-lg gap-x-2 flex items-center hover:bg-blue-600/90 transition-colors"
              onClick={() =>
                append({
                  url: "",
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
        <div>
          <div className="bg-[#f1f1f1] rounded-lg w-full p-4 md:p-6 lg:p-8">
            <div className="font-semibold text-[#5a5a5a] text-2xl">FAQ</div>

            <div className="space-y-2 mt-1 lg:mt-2">
              <div>
                <span className="font-semibold text-lg text-[#5a5a5a]">
                  - What social links are supported?
                </span>
                <span className="block pl-3 text-black/70">
                  We currently support{" "}
                  {getSupportedSocials()
                    .map((social) => `${social[0].toUpperCase()}${social.slice(1)}`)
                    .join(", ")}
                  .
                </span>
              </div>
              <div>
                <span className="font-semibold text-lg text-[#5a5a5a]">
                  - How to get your social link?
                </span>
                <span className="block pl-3 text-black/70">
                  Go to your social profile, copy the URL and paste it to the input above.
                  <br />
                  For example:
                  <br />
                  <div className="pl-5">
                    <span className="block">- https://facebook.com/yourusername</span>
                    <span className="block">- https://twitter.com/yourusername</span>
                    <span className="block">- https://instagram.com/yourusername</span>
                    <span className="block">- https://tiktok.com/@yourusername</span>
                  </div>
                </span>
              </div>

              <div>
                <span className="font-semibold text-lg text-[#5a5a5a]">
                  - How many social links can I add?
                </span>
                <span className="block pl-3 text-black/70">
                  You can add up to {getSupportedSocials().length} social links, but 1 link per
                  social network only.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialPage;
