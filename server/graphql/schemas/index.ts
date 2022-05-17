import {
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { articles, categories, childCategories, images, prices } from "../../data";

const Category: any = new GraphQLObjectType({
  name: "Category",
  description: "Shop product Category",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    urlPath: { type: GraphQLString },
    articles: {
      type: new GraphQLList(Article),
      resolve: (category) =>
        articles.filter((article) => article.categoryId === category.id),
    },
    articleCount: {
      type: GraphQLInt,
      resolve: (category) =>
        articles.filter((article) => article.categoryId === category.id).length,
    },
    childCategories: {
      type: new GraphQLList(ChildCategory),
      resolve: (category) =>
        childCategories.filter((cat) => cat.categoryId === category.id),
    },
  }),
});

const ChildCategory: any = new GraphQLObjectType({
  name: "ChildCategory",
  description: "Shop Child Category belonging to a parent category",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    categoryId: { type: new GraphQLNonNull(GraphQLInt) },
    parent: {
      type: Category,
      resolve: (childCategory) =>
        categories.find((cat) => cat.id === childCategory.categoryId),
    },
    urlPath: { type: GraphQLString },
  }),
});

const Article = new GraphQLObjectType({
  name: "Article",
  description: "individual Article",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    variantName: { type: new GraphQLNonNull(GraphQLString) },
    prices: {
      type: Price,
      resolve: (article) =>
        prices.find((price) => price.articleId === article.id),
    },
    images: {
      type: new GraphQLList(Image),
      resolve: (article) =>
        images.filter((image) => image.articleId === article.id),
    }
  }),
});

const Price = new GraphQLObjectType({
  name: "Prices",
  description: "individual Prices of articles",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    articleId: { type: new GraphQLNonNull(GraphQLInt) },
    currency: { type: new GraphQLNonNull(GraphQLString) },
    value: { type: new GraphQLNonNull(GraphQLFloat) },
  }),
});

const Image = new GraphQLObjectType({
  name: "Images",
  description: "individual Image of articles",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    articleId: { type: new GraphQLNonNull(GraphQLInt) },
    path: { type: new GraphQLNonNull(GraphQLString) }
  }),
});

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    description: "Root Query",
    fields: () => ({
      categories: {
        type: new GraphQLList(Category),
        description: "List of Categories",
        resolve: () => categories,
      },
      category: {
        type: Category,
        description: "single Category",
        args: {
          id:{ type: GraphQLInt}
        },
        resolve: (parent, args) => categories.find(cat => cat.id === args.id)
      },
      childCategories: {
        type: new GraphQLList(ChildCategory),
        description: "List of Child Categories",
        resolve: () => childCategories,
      },
      articles: {
        type: new GraphQLList(Category),
        description: "List of Articles",
        resolve: () => articles,
      },
    }),
  }),
});
