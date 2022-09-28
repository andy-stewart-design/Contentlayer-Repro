import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypePrettyCode, { Options } from "rehype-pretty-code";
// import rehypeAutolinkHeadings from "rehype-autolink-headings";
// import rehypeSlug from "rehype-slug";

export const Post = defineDocumentType(() => ({
  name: "Post",
  contentType: "mdx",
  filePathPattern: "posts/*.mdx",
  computedFields: {
    slug: {
      type: "string",
      resolve: (post) =>
        post._raw.sourceFileName
          // hello-world.mdx => hello-world
          .replace(/\.mdx$/, ""),
    },
  },
  fields: {
    title: { type: "string", required: true },
    date: { type: "string", required: true },
    summary: { type: "string", required: true },
    image: { type: "string", required: false },
    tags: {
      type: "list",
      of: { type: "string" },
      required: false,
    },
  },
}));

// export const Snippet = defineDocumentType(() => ({
//   name: "Snippet",
//   contentType: "mdx",
//   filePathPattern: "snippets/**/index.mdx",
//   computedFields: {
//     slug: {
//       type: "string",
//       resolve: (post) => post._raw.flattenedPath.replace(/snippets\//, ""),
//     },
//   },
//   fields: {
//     title: { type: "string", required: true },
//     summary: { type: "string", required: true },
//     framework: {
//       type: "enum",
//       options: ["React", "Svelte", "Javascript"],
//       required: true,
//     },
//     image: { type: "string", required: true },
//     alt: { type: "string", required: true },
//     date: { type: "string", required: true },
//   },
// }));

const rehypePrettyCodeOptions: Partial<Options> = {
  theme: "github-dark",
  tokensMap: {
    // VScode command palette: Inspect Editor Tokens and Scopes
    // https://github.com/Binaryify/OneDark-Pro/blob/47c66a2f2d3e5c85490e1aaad96f5fab3293b091/themes/OneDark-Pro.json
    fn: "entity.name.function",
    objKey: "meta.object-literal.key",
  },
  onVisitLine(node) {
    // Prevent lines from collapsing in `display: grid` mode, and
    // allow empty lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  onVisitHighlightedLine(node) {
    node.properties.className.push("line--highlighted");
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ["word--highlighted"];
  },
};

// const HEADING_LINK_ANCHOR = `before:content-['#'] before:absolute before:-ml-[1em] before:text-gray-500/0 hover:before:text-gray-500/20 pl-[1em] -ml-[1em] underline no-underline`;

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post],
  mdx: {
    cwd: process.cwd(),
    esbuildOptions(options) {
      options.target = "esnext";
      return options;
    },
    rehypePlugins: [
      //   [rehypeSlug],
      [rehypePrettyCode, rehypePrettyCodeOptions],
      //   [
      //     rehypeAutolinkHeadings,
      //     {
      //       behavior: "wrap",
      //       properties: {
      //         className: [HEADING_LINK_ANCHOR],
      //       },
      //     },
      //   ],
    ],
  },
});
