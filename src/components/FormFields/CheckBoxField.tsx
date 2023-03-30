import { Field } from "formik";
import React from "react";

const Checkbox = ({ name }: { name: string; label: string }) => {
  return (
    <div className={`"mb-6 w-full px-3 md:mb-0 `}>
      <label
        className="flex items-center gap-2 text-xs font-bold uppercase  tracking-wide text-gray-400"
        htmlFor={name}
      >
        {name}
        <Field
          className="bg-primary grid
                 h-4 w-4 appearance-none place-content-center border border-white transition-all duration-200 ease-in before:h-2 before:w-2 before:scale-0 before:bg-white  before:shadow-[inset_1em_1em_white] before:content-[''] checked:before:scale-100  focus:outline-none"
          name={name}
          type="checkbox"
        />
      </label>
    </div>
  );
};

export default Checkbox;
