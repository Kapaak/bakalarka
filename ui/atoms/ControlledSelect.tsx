import { Controller } from "react-hook-form";
import Select from "react-select";

interface ControlledSelectProps<T> {
  name: string;
  options: T[];
  required?: boolean;
}

export const ControlledSelect = <T,>({
  name,
  options,
  required,
}: ControlledSelectProps<T>) => {
  return (
    <Controller
      name={name}
      rules={{ required }}
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
