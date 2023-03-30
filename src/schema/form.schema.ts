import * as Yup from "yup";

export const formSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  price: Yup.number().required("Price is required"),
  quantity: Yup.number()
    .required("Quantity is required")
    .integer("Quantity must be an integer"),
  image: Yup.string(),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Category is required"),
});
