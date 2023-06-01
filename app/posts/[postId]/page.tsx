import { getPostsMeta, getPostByName } from "@/lib/posts";
import React from "react";
import { notFound } from "next/navigation";
import getFormattedDate from "@/lib/getFormattedDate";
import Link from "next/link";

export const revalidate = 10;

type Props = {
  params: {
    postId: string;
  };
};

export async function generateStaticParams() {
  const posts = await getPostsMeta();

  if (!posts) return [];

  return posts.map((post) => ({
    postId: post.id,
  }));
}

export async function generateMetadata({ params: { postId } }: Props) {
  const post = await getPostByName({ fileName: `${postId}.mdx` });

  if (!post) {
    return {
      title: "No Post found.",
    };
  }

  return {
    title: `Post: ${post.meta.title}`,
    description: `Description: ${post.meta.title}`,
  };
}

export default async function Post({ params: { postId } }: Props) {
  const post = await getPostByName({ fileName: `${postId}.mdx` });

  if (!post) return notFound();

  const { meta, content } = post;
  const pubDate = getFormattedDate(meta.date);

  const tags = meta.tags.map((tag, i) => (
    <Link key={i} href={`/tags/${tag}`}>
      {tag}
    </Link>
  ));

  return (
    <main className="px-6 prose prose-xl prose-slate dark:prose-invert mx-auto">
      <h1 className="text-3xl mt-4 mb-0">{meta.title}</h1>
      <p className="mt-0">{pubDate}</p>
      <article>{content}</article>
      <section>
        <h3>Related:</h3>
        <div className="flex flex-row gap-4">{tags}</div>
      </section>
      <p>
        <Link href="/">← Back to home</Link>
      </p>
    </main>
  );
}
