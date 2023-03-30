import React from "react";
import FileBase from "react-file-base64";

const ImageField = ({
  setFieldValue,
  name,
}: {
  name: string;
  setFieldValue: (
    field: string,
    value: string | number | boolean,
    shouldValidate?: boolean | undefined
  ) => void;
}) => {
  return (
    <div className="flex w-full flex-col px-2">
      <label className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-400">
        Product Image
      </label>
      <div className="w-full rounded-md bg-white p-2">
        <FileBase
          type="file"
          multiple={false}
          onDone={({ base64 }: { base64: string }) =>
            setFieldValue(name, base64)
          }
        />
      </div>
    </div>
  );
};

export default ImageField;
