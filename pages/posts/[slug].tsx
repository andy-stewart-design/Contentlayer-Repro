import { allPosts, type Post } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import {
  type GetStaticPaths,
  type GetStaticProps,
  type InferGetStaticPropsType,
} from "next";
// import MDXComponents from "components/content/MDXComponents";

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: allPosts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
};
export const getStaticProps: GetStaticProps<{ post: Post }> = ({ params }) => {
  const post = allPosts.find((post) => post.slug === params?.slug);

  if (!post) {
    return { notFound: true };
  }

  return { props: { post } };
};

export default function SinglePostPage({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const MDXContent = useMDXComponent(post.body.code);
  return (
    <article className="py-24 px-2">
      <div className="prose">
        <h1>{post.title}</h1>
        {/* <MDXContent components={MDXComponents} /> */}
        <MDXContent />
      </div>
    </article>
  );
}
