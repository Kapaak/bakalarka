import { Controller } from "react-hook-form";
import Select from "react-select";

interface ControlledSelectProps<T> {
  name: string;
  options: T[];
}

export const ControlledSelect = <T,>({
  name,
  options,
}: ControlledSelectProps<T>) => {
  return (
    <Controller
      name={name}
      render={({ field: { ref, onChange, value } }) => (
        <Select
          ref={ref}
          onChange={onChange}
          isMulti
          options={options}
          value={value}
        />
      )}
    />
  );
};
