import { formatDate } from "@/lib/dates";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

export function PostPublishedAt({
  publishedAt,
  className,
}: {
  publishedAt: string;
  className?: string;
}) {
  return (
    <time className={cn("text-sm font-medium text-slate-500", className)}>
      {formatDate(publishedAt)}
    </time>
  );
}

export function PostCategory({
  category,
  className,
}: {
  category: { slug: string; name: string };
  className?: string;
}) {
  return (
    <Link
      href={`/blog/categories/${category.slug}`}
      className={cn("text-orange-500 font-medium hover:underline", className)}
    >
      {category.name}
    </Link>
  );
}

export function PostDescription({
  description,
  className,
}: {
  description: string;
  className?: string;
}) {
  return (
    <p className={cn("text-slate-600 text-balance", className)}>
      {description}
    </p>
  );
}

export function PostTitle({
  title,
  className,
  size,
  as,
}: {
  title: string;
  as: "h1" | "h2";
  className?: string;
  size?: "default" | "lg" | "xl";
}) {
  const titleSizes = cva("font-bold tracking-tighter", {
    variants: {
      size: {
        default: "text-2xl md:text-3xl",
        lg: "text-3xl md:text-4xl",
        xl: "text-4xl md:text-6xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  });

  const Tag = as;

  return <Tag className={cn(titleSizes({ size, className }))}>{title}</Tag>;
}
