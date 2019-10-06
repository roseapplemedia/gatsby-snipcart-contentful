import { resolve } from "path";
import { createFilePath } from "gatsby-source-filesystem";

const PostTemplate = resolve("./src/templates/post-template.js");
const BlogTemplate = resolve("./src/templates/blog-template.js");
const ProductTemplate = resolve("./src/templates/product-template.js");

export function onCreateNode({ node, getNode, actions }) {
  const { createNodeField } = actions;
  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({ node, getNode, basePath: "posts" });
    createNodeField({
      node,
      name: "slug",
      value: slug
    });
  }
}

export async function createPages({ graphql, actions }) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }

      allContentfulProduct {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);

  const posts = result.data.allMarkdownRemark.edges;
  posts.forEach(({ node: post }) => {
    createPage({
      path: `posts${post.fields.slug}`,
      component: PostTemplate,
      context: {
        slug: post.fields.slug
      }
    });
  });

  const postsPerPage = 2;
  const totalPages = Math.ceil(posts.length / postsPerPage);
  Array.from({ length: totalPages }).forEach((_, index) => {
    const currentPage = index + 1;
    const isFirstPage = index === 0;
    const isLastPage = currentPage === totalPages;

    createPage({
      path: isFirstPage ? "/blog" : `/blog/${currentPage}`,
      component: BlogTemplate,
      context: {
        limit: postsPerPage,
        skip: index * postsPerPage,
        isFirstPage,
        isLastPage,
        currentPage,
        totalPages
      }
    });
  });

  const products = result.data.allContentfulProduct.edges;
  products.forEach(({ node: product }) => {
    createPage({
      path: `/products/${product.slug}`,
      component: ProductTemplate,
      context: {
        slug: product.slug
      }
    });
  });
}
