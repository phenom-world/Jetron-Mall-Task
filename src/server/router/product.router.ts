import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  getProductsHandler,
  updateProductHandler,
} from "../controller/product.controller";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  createProductSchema,
  filterQuery,
  params,
  updateProductSchema,
} from "../schema/product.schema";

export const productsRouter = createTRPCRouter({
  createProduct: publicProcedure
    .input(createProductSchema)
    .mutation(({ input }) => createProductHandler({ input })),

  updateProduct: publicProcedure
    .input(updateProductSchema)
    .mutation(({ input }) =>
      updateProductHandler({ paramsInput: input.params, input: input.body })
    ),

  deleteProduct: publicProcedure
    .input(params)
    .mutation(({ input }) => deleteProductHandler({ paramsInput: input })),

  getProduct: publicProcedure
    .input(params)
    .query(({ input }) => getProductHandler({ paramsInput: input })),

  getProducts: publicProcedure
    .input(filterQuery)
    .query(({ input }) => getProductsHandler({ filterQuery: input })),
});
