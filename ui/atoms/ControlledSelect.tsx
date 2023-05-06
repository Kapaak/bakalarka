import { Controller } from "react-hook-form";
import Select from "react-select";

interface ControlledSelectProps {
  name: string;
  options: any;
}

export const ControlledSelect = ({ name, options }: ControlledSelectProps) => {
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
