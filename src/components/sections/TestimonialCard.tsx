import { Star } from "lucide-react";

interface TestimonialCardProps {
  yachtName: string;
  country: string;
  rating: number;
  content: string;
}

export function TestimonialCard({
  yachtName,
  country,
  rating,
  content,
}: TestimonialCardProps) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
      <div className="mb-4 flex gap-1">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="h-5 w-5 fill-sand text-sand" />
        ))}
      </div>
      <blockquote className="mb-6 text-gray-700 leading-relaxed">
        &ldquo;{content}&rdquo;
      </blockquote>
      <div>
        <p className="font-semibold text-navy">{yachtName}</p>
        <p className="text-sm text-gray-500">{country}</p>
      </div>
    </div>
  );
}
