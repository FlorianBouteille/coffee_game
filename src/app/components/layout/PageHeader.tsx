"use client";

import { ProgressMenuButton } from "@/app/components/navigation/ProgressMenu";

interface PageHeaderProps {
  title: string;
}

export function PageHeader({ title }: PageHeaderProps) {
  return (
    <header className="flex items-center justify-between py-6 px-6">
      <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
      <ProgressMenuButton />
    </header>
  );
}
