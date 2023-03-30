import { Product } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { NextRouter, useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { api } from "~/utils/api";
import ActionButtons from "../ActionButtons";

const Product = ({ product }: { product: Product }) => {
  const [open, setOpen] = useState(false);
  const router: NextRouter = useRouter();
  const queryClient = useQueryClient();

  // Delete Product Mutation
  const { mutate: deleteProduct, isLoading: loading } =
    api.products.deleteProduct.useMutation({
      onSuccess: () => {
        queryClient.refetchQueries([["getProducts", { limit: 10, page: 1 }]]);
        toast.success("Product deleted successfully");
      },
      onError: () => {
        toast.error("Failed to delete product! Please try again later.");
      },
    });

  // handle Delete Product
  const handleDelete = (id: string) => {
    deleteProduct({ productId: id });
  };

  return (
    <div
      key={product.name}
      className="relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg"
      onClick={() => {
        router.push(`/product/${product.id}`);
      }}
    >
      <div className="relative">
        <Image
          src={
            product.image ||
            "https://fatcat.ng/storage/files/ng/11468/thumb-816x460-7ff3a58dddc928b5b57c543d11660bde.jpg"
          }
          alt={product.name}
          width={200}
          height={200}
          className="max-h-[250px] w-full object-cover"
        />
        <ActionButtons
          open={open}
          id={product.id}
          setOpen={setOpen}
          handleDelete={handleDelete}
          loading={loading}
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900">{product.name}</h3>
        <p className="text-gray-600">${product.price}</p>
      </div>
    </div>
  );
};

export default Product;
