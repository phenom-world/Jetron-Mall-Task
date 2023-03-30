import { Formik, Form } from "formik";
import { NextRouter, useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { formSchema } from "~/schema/form.schema";
import { api } from "~/utils/api";
import Input from "../FormFields/InputField";
import SelectField from "../FormFields/SelectField";
import Toggle from "../FormFields/Toggle";
import ImageField from "../FormFields/ImageField";
import { LoadingSpinner } from "../Spinner";
import { Product } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { categoryOptions, formGroups, initialValues } from "./data";

function CreateProductForm({ data }: { data?: Product }) {
  const router: NextRouter = useRouter();
  const queryClient = useQueryClient();
  const { edit } = router.query;

  // Create Product Mutation
  const { isLoading, mutate } = api.products.createProduct.useMutation({
    onSuccess() {
      queryClient.refetchQueries([["getProducts", { limit: 10, page: 1 }]]);
      toast.success("Product created successfully");
    },
    onError() {
      toast.error("Failed to create product! Please try again later.");
    },
  });

  // Update Product Mutation
  const { mutate: updateProduct, isLoading: Loading } =
    api.products.updateProduct.useMutation({
      onSuccess: () => {
        queryClient.refetchQueries([["getProducts", { limit: 10, page: 1 }]]);
        toast.success("Product updated successfully");
      },
      onError: () => {
        toast.error("Failed to update product! Please try again later.");
      },
    });

  // handle Submit
  const handleSubmit = (values: typeof initialValues) => {
    edit
      ? updateProduct({
          body: { ...values },
          params: { productId: data?.id as string },
        })
      : mutate(values);
  };

  return (
    <Formik
      initialValues={{ ...initialValues, ...data }}
      validationSchema={formSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, setFieldValue }) => (
        <Form className="mx-auto w-full max-w-lg py-12">
          {formGroups?.map((item, index) => (
            <div className="-mx-3 mb-6 flex flex-wrap" key={index}>
              {item?.map((input, i) =>
                input.type === "select" ? (
                  <SelectField
                    name={input?.fieldName}
                    label={input?.fieldName}
                    key={i}
                    options={categoryOptions}
                    fullWidth={
                      input.fieldName === "description" ||
                      input.fieldName === "image"
                    }
                  />
                ) : input.type === "checkbox" ? (
                  <Toggle
                    value={
                      values?.[input.fieldName as keyof typeof values] as string
                    }
                    name={input.fieldName}
                    setFieldValue={setFieldValue}
                    key={i}
                  />
                ) : input.type === "file" ? (
                  <ImageField
                    setFieldValue={setFieldValue}
                    name={input.fieldName}
                    key={i}
                  />
                ) : (
                  <Input
                    name={input?.fieldName}
                    label={input?.fieldName}
                    key={i}
                    type={input?.type}
                    fullWidth={
                      input.fieldName === "description" ||
                      input.fieldName === "image"
                    }
                  />
                )
              )}
            </div>
          ))}
          <div className="-mx-3 mb-6 flex flex-wrap">
            <div className="w-full px-3">
              <button
                className="focus:shadow-outline w-full rounded bg-button px-4 py-3 font-bold text-white hover:bg-[#6f7a8b] focus:outline-none"
                type="submit"
              >
                {Loading || isLoading ? (
                  <div className="flex items-center justify-center">
                    <LoadingSpinner size={20} />
                  </div>
                ) : edit ? (
                  "Save Changes"
                ) : (
                  "Create"
                )}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
export default CreateProductForm;
