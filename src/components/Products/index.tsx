import { Product } from "@prisma/client";
import React from "react";
import Productt from "../Product";

const Products = ({ data }: { data?: Product[] }) => {
  return (
    <div className="container mx-auto mt-4 p-4">
      <h1 className="mb-4 text-2xl font-semibold text-white">Products</h1>
      <div className="grid gap-6 gap-y-8 md:grid-cols-4">
        {data?.map(
          (product) =>
            !product?.hidden && <Productt key={product?.id} product={product} />
        )}
      </div>
    </div>
  );
};

export default Products;
