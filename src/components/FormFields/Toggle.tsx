import React, { useState } from "react";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";

const Toggle = ({
  name,
  value,
  setFieldValue,
}: {
  name: string;
  value: string;
  setFieldValue: (
    field: string,
    value: string | number | boolean,
    shouldValidate?: boolean | undefined
  ) => void;
}) => {
  const [toggle, setToggle] = useState(!!value);
  return (
    <div className={`"mb-6 w-full px-3 md:mb-0 `}>
      <label className="flex items-center gap-3 text-xs font-bold uppercase  tracking-wide text-gray-400">
        {name}
        {toggle ? (
          <BsToggleOn
            size={30}
            onClick={() => {
              setToggle(!toggle);
              setFieldValue(name, !toggle);
            }}
          />
        ) : (
          <BsToggleOff
            size={30}
            onClick={() => {
              setToggle(!toggle);
              setFieldValue(name, !toggle);
            }}
          />
        )}
      </label>
    </div>
  );
};

export default Toggle;
