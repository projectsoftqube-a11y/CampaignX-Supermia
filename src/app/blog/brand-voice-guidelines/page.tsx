import { BlogPostPage } from "@/components/page/BlogPostPage";
import { post } from "@/config/posts/brand-voice-guidelines";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: post.metaTitle,
  description: post.description,
  path: `/blog/${post.slug}`,
});

export default function Page() {
  return <BlogPostPage post={post} />;
}
