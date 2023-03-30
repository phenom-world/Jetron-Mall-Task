export const initialValues = {
  name: "",
  price: 0,
  quantity: 0,
  image: "",
  description: "",
  category: "",
};

export const formGroups = [
  [
    { fieldName: "name", type: "text" },
    { fieldName: "price", type: "number" },
  ],
  [
    { fieldName: "quantity", type: "number" },
    { fieldName: "category", type: "select" },
  ],
  [{ fieldName: "description", type: "textarea" }],
  [{ fieldName: "image", type: "file" }],
  [{ fieldName: "hidden", type: "checkbox" }],
];

export const categoryOptions = [
  { value: "electronics", label: "Electronics" },
  { value: "jewelery", label: "Jewelery" },
  { value: "phones", label: "Phones" },
];
