import { Controller } from "react-hook-form";
import { Input, InputProps } from "..";

interface FormInputProps extends InputProps {
  label?: string;
  name: string;
}

//todo -> nejsem si jistej jestli tohle neni atom
export const FormInput = ({
  name,
  placeholder,
  label,
  className,
  ...rest
}: FormInputProps) => {
  return (
    <Controller
      name={name}
      render={({ field: { ref, onChange } }) => (
        <div className="relative w-full">
          {/* <label className="absolute">{label}</label> */}
          {/* todo -> udelej to vyjizdeni stejny jak mas v routistu na PC */}
          <Input
            {...rest}
            placeholder={placeholder ?? label}
            ref={ref}
            onChange={onChange}
            className={`w-full ${className}`}
          />
        </div>
      )}
    />
  );
};

{
  /* <Controller
  control={control}
  name="test"
  render={({
    field: { onChange, onBlur, value, name, ref },
    fieldState: { invalid, isTouched, isDirty, error },
    formState,
  }) => (
    <Checkbox
      onBlur={onBlur} // notify when input is touched
      onChange={onChange} // send value to hook form
      checked={value}
      inputRef={ref}
    />
  )}
/> */
}
