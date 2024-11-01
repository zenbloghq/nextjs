/* eslint-disable @next/next/no-img-element */
import { cms } from "@/lib/cms";
import {
  PostCategory,
  PostDescription,
  PostPublishedAt,
  PostTitle,
} from "@/components/blog";

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const { data: post } = await cms.posts.get({ slug: params.slug });

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <article className="mx-auto mt-8 space-y-12 px-6">
      <header className="max-w-2xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          {post.category ? <PostCategory category={post.category} /> : null}
          <PostPublishedAt publishedAt={post.published_at} />
        </div>
        <div className="text-center space-y-2">
          <PostTitle as="h1" title={post.title} size="xl" />
          <PostDescription description={post.excerpt ?? ""} />
        </div>
      </header>
      <img
        height="600"
        width="600"
        className="rounded-lg object-cover w-full max-h-[540px] mt-8"
        src={post.cover_image}
        alt={post.title}
      />
      <section className="prose prose-lg md:prose-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: post.html_content }} />
      </section>
    </article>
  );
}
