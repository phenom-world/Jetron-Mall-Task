import { ErrorMessage, Field } from "formik";
import Image from "next/image";
import React from "react";

interface IProps {
  name: string;
  label?: string;
  fullWidth?: boolean;
  options?: {
    value: string;
    label: string;
  }[];
}

const SelectField = ({ name, label, fullWidth, options }: IProps) => {
  return (
    <div
      className={`"mb-6 w-full px-3 md:mb-0 ${
        fullWidth ? "w-full" : "md:w-1/2"
      }`}
    >
      <label
        className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-400"
        htmlFor={name}
      >
        {label ?? name}
      </label>

      <div className="relative">
        <Field
          className="mb-1 block w-full appearance-none rounded border bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none"
          name={name}
          as={"select"}
        >
          <option value="" disabled>
            Select an option
          </option>
          {options?.map(({ value, label }) => (
            <option value={value} key={value}>
              {label}
            </option>
          ))}
        </Field>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
          <Image
            src="/assets/svg/arrow-down.svg"
            alt="arrow-down"
            width={20}
            height={20}
          />
        </div>
      </div>
      <ErrorMessage
        name={name}
        component="p"
        className="text-xs italic text-red-500"
      />
    </div>
  );
};

export default SelectField;
