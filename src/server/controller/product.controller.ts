import {
  CreateProductInput,
  FilterQueryInput,
  ParamsInput,
  UpdateProductInput,
} from "../schema/product.schema";
import { TRPCError } from "@trpc/server";
import {
  createProduct,
  deleteProduct,
  findAllProducts,
  findUniqueProduct,
  updateProduct,
} from "../service/product.service";

export const createProductHandler = async ({
  input,
}: {
  input: CreateProductInput;
}) => {
  try {
    const product = await createProduct({
      name: input.name,
      description: input.description,
      category: input.category,
      image: input.image,
      price: input.price,
      quantity: input.quantity,
    });

    return {
      status: "success",
      data: {
        product,
      },
    };
  } catch (err: any) {
    if (err.code === "P2002") {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Product with that title already exists",
      });
    }
    throw err;
  }
};

export const getProductHandler = async ({
  paramsInput,
}: {
  paramsInput: ParamsInput;
}) => {
  try {
    const product = await findUniqueProduct({ id: paramsInput.productId });
    if (!product) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Product with that ID not found",
      });
    }

    return {
      status: "success",
      data: {
        product,
      },
    };
  } catch (err: any) {
    throw err;
  }
};

export const getProductsHandler = async ({
  filterQuery,
}: {
  filterQuery: FilterQueryInput;
}) => {
  try {
    const products = await findAllProducts(filterQuery.page, filterQuery.limit);

    return {
      status: "success",
      results: products.length,
      data: {
        products,
      },
    };
  } catch (err: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: err.message,
    });
  }
};

export const updateProductHandler = async ({
  paramsInput,
  input,
}: {
  paramsInput: ParamsInput;
  input: UpdateProductInput;
}) => {
  try {
    const product = await updateProduct({ id: paramsInput.productId }, input);
    if (!product) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Product with that ID not found",
      });
    }
    return {
      status: "success",
      data: {
        product,
      },
    };
  } catch (err: any) {
    throw err;
  }
};

export const deleteProductHandler = async ({
  paramsInput,
}: {
  paramsInput: ParamsInput;
}) => {
  try {
    const product = await deleteProduct({ id: paramsInput.productId });

    if (!product) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Product with that ID not found",
      });
    }
    return {
      status: "success",
      data: null,
    };
  } catch (err: any) {
    throw err;
  }
};
