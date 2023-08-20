import { cva, VariantProps } from "class-variance-authority";
const labelContainerVariant = cva(["flex"], {
  variants: {
    direction: {
      horizontal: "",
      vertical: "flex-col",
    },
  },
  defaultVariants: {
    direction: "vertical",
  },
});

export type LabelContainerProps = React.ButtonHTMLAttributes<HTMLDivElement> &
  VariantProps<typeof labelContainerVariant> & {
    label: string;
  };

export const LabelContainer = ({
  direction,
  label,
  children,
  className,
}: LabelContainerProps) => {
  return (
    <div className={labelContainerVariant({ direction, className })}>
      <label>{label}</label>
      {children}
    </div>
  );
};
