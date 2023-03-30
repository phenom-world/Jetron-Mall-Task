import { GetStaticProps, type NextPage } from "next";
import { PageLayout } from "~/components/Layout/Layout";
import Products from "~/components/Products";
import { LoadingPage } from "~/components/Spinner";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data, isLoading } = api.products.getProducts.useQuery({
    limit: 10,
    page: 1,
  });

  if (isLoading)
    return (
      <div className="flex grow">
        <LoadingPage />
      </div>
    );

  return (
    <PageLayout>
      {data?.data?.products?.length === 0 ? (
        <p className="text-center text-white">No Product Found</p>
      ) : (
        <Products data={data?.data.products} />
      )}
    </PageLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const ssg = generateSSGHelper();
  await ssg.products.getProducts.prefetch({
    limit: 10,
    page: 1,
  });
  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};

export default Home;
