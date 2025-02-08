/* eslint-disable @next/next/no-img-element */
import { formatDate } from "@/lib/dates";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { Author, Category } from "zenblog/types";

export function PostItem({
  children,
  className,
  slug,
}: {
  children: React.ReactNode;
  className?: string;
  slug: string;
}) {
  return (
    <Link className={cn("group", className)} href={`/blog/${slug}`}>
      {children}
    </Link>
  );
}

export function PostImage({
  src,
  alt,
  className,
}: {
  src?: string;
  alt?: string;
  className?: string;
}) {
  if (!src) {
    return <div className="w-full h-[400px] bg-slate-100 rounded-xl" />;
  }

  return (
    <div className={cn("overflow-hidden rounded-xl", className)}>
      <img
        src={src}
        alt={alt}
        height={400}
        width={400}
        className={
          "w-full group-hover:scale-105 transition-all duration-300 object-cover max-h-[400px]"
        }
      />
    </div>
  );
}

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
  category: Category;
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

export function PostAuthor({
  author,
  className,
}: {
  author: Author;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "flex gap-2 items-center text-sm font-medium text-slate-500",
        className
      )}
    >
      <img
        src={author.image_url}
        alt={author.name}
        className="w-6 h-6 rounded-full object-cover"
      />
      {author.name}
    </section>
  );
}
