import Link from "next/link";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  href?: string;
}

export function ServiceCard({ title, description, icon, href }: ServiceCardProps) {
  const Icon = (Icons[icon as keyof typeof Icons] as LucideIcon) || Icons.Star;

  const content = (
    <div className="group rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-ocean/30 hover:shadow-lg hover:shadow-ocean/5">
      <div className="mb-4 inline-flex rounded-lg bg-ocean/10 p-3 text-ocean transition-colors group-hover:bg-ocean group-hover:text-white">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-2 font-serif text-xl font-semibold text-navy">{title}</h3>
      <p className="text-sm leading-relaxed text-gray-600">{description}</p>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
