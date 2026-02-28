import { getSanityBlogPosts } from "@/lib/fetchBlog";
import { RecentArticles } from "./RecentArticles";

export async function RecentArticlesServer() {
    const { posts } = await getSanityBlogPosts({ perPage: 3 });
    if (!posts || posts.length === 0) return null;
    return <RecentArticles posts={posts} />;
}
