import { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { NextRouter, useRouter } from "next/router";
import React from "react";
import { PageLayout } from "~/components/Layout/Layout";
import CreateProductForm from "~/components/ProductForm";
import { LoadingPage } from "~/components/Spinner";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";

const ViewProduct: NextPage<{ id: string }> = ({ id }) => {
  const router: NextRouter = useRouter();
  const { edit } = router.query;
  const { data, isLoading } = api.products.getProduct.useQuery({
    productId: id,
  });

  if (isLoading) return <LoadingPage />;

  if (!data?.data?.product)
    return (
      <PageLayout>
        <p className="mt-2 text-center text-white">Something went wrong</p>
      </PageLayout>
    );

  return (
    <PageLayout>
      {!edit ? (
        <div className="my-8 flex flex-col gap-12">
          <div className="w-[30%]">
            <Image
              className="h-[400px] min-w-[270px] rounded-lg object-cover shadow-lg md:min-w-[300px]"
              src={
                data?.data?.product?.image ||
                "https://via.placeholder.com/500x500"
              }
              alt="Product Image"
              width={500}
              height={400}
            />
          </div>
          <div className="flex flex-col text-white">
            <h2 className="mb-2 text-2xl font-bold">
              {data?.data?.product?.name}
            </h2>
            <p className="mb-4 text-lg ">${data?.data?.product?.price}</p>
            <p className="mb-4 text-lg ">{data?.data?.product?.description} </p>
            <button
              className="focus:shadow-outline w-fit rounded bg-button px-4 py-2 font-bold text-white hover:bg-[#6f7a8b] focus:outline-none"
              onClick={() => {
                router.push({
                  pathname: `/product/${id}`,
                  query: { edit: true },
                });
              }}
            >
              Edit Product
            </button>
          </div>
        </div>
      ) : (
        <CreateProductForm data={data?.data?.product} />
      )}
    </PageLayout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const id = context.params?.id;

  if (typeof id !== "string") throw new Error("no id");

  await ssg.products.getProduct.prefetch({ productId: id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default ViewProduct;
