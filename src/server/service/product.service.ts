import { Prisma, Product } from "@prisma/client";
import { prisma } from "../db";

export const createProduct = async (input: Prisma.ProductCreateInput) => {
  return (await prisma.product.create({
    data: input,
  })) as Product;
};

export const findProduct = async (
  where: Partial<Prisma.ProductWhereInput>,
  select?: Prisma.ProductSelect
) => {
  return (await prisma.product.findFirst({
    where,
    select,
  })) as Product;
};

export const findUniqueProduct = async (
  where: Prisma.ProductWhereUniqueInput,
  select?: Prisma.ProductSelect
) => {
  return (await prisma.product.findUnique({
    where,
    select,
  })) as Product;
};

export const findAllProducts = async (page: number, limit: number) => {
  const take = limit || 10;
  const skip = (page - 1) * limit;
  return (await prisma.product.findMany({
    skip,
    take,
  })) as Product[];
};

export const updateProduct = async (
  where: Partial<Prisma.ProductWhereUniqueInput>,
  data: Prisma.ProductUpdateInput,
  select?: Prisma.ProductSelect
) => {
  return (await prisma.product.update({ where, data, select })) as Product;
};

export const deleteProduct = async (where: Prisma.ProductWhereUniqueInput) => {
  return await prisma.product.delete({ where });
};
