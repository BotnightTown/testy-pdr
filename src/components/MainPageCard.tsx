"use client";

import Link from "next/link";

interface MainPageCardProps {
  title: string;
  description: string;
  link: string;
  buttonText: string;
}

export default function MainPageCard({
  title,
  description,
  link,
  buttonText,
}: MainPageCardProps) {
  return (
    <Link
      href={link}
      className="group flex h-max md:h-43 w-full cursor-pointer flex-col justify-between rounded-lg border border-slate-200 bg-white p-5 text-left transition-all hover:border-blue-400 hover:shadow-sm items-start gap-1"
    >
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <p className="text-sm leading-6 text-slate-500">{description}</p>
      <p className="text-sm font-bold text-blue-600">{buttonText}</p>
    </Link>
  );
}
