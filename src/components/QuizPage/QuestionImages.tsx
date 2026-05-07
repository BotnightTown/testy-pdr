"use client";

import Image from "next/image";

import { getFullImageSrc } from "@/utils/image";

interface Props {
  images?: string | string[];
  descriptions?: string[];
}

export default function QuestionImages({ images, descriptions }: Props) {
  const imagesArray = Array.isArray(images) ? images : images ? [images] : [];

  if (!imagesArray.length) {
    return null;
  }

  return (
    <div
      className={`mb-8 grid gap-6 ${
        imagesArray.length > 1 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"
      }`}
    >
      {imagesArray.map((img, index) => {
        const description = descriptions?.[index];

        return (
          <div key={`${img}-${index}`} className="flex flex-col gap-3">
            <div className="relative min-h-62.5 overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 shadow-sm">
              <Image
                src={getFullImageSrc(img)}
                alt={description || `Ілюстрація ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                className="object-contain p-2"
                unoptimized
                loading="eager"
              />
            </div>

            {description && (
              <p className="text-base text-black font-semibold px-2 leading-relaxed italic">
                {description}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
