/**
 * Returns the default style for a form input.
 * @param px The horizontal padding.
 * @param py The vertical padding.
 * @param other Any additional classes to include.
 * @returns The default style string.
 */
export const DefaultStyle = ({ px, py, other }: { px?: string; py?: string; other?: string }) => {
    return `min-h-12 border-2 border-foreground bg-transparent px-${px ?? '4'} py-${py ?? '3'} text-lg text-foreground italic outline-none transition-colors placeholder:text-foreground/60 focus:border-secondary rounded-full ${other ?? ''}`;
};

/**
 * A divider component.
 * @param size The size of the divider.
 * @returns The divider component.
 */
export const Divider = ({ size }: {size: string}) => {
    return (
        <hr
            className={`border-t border-gray-300 my-4 mx-auto ${size}`}
        ></hr>
    );
};

type FieldLabelProps = {
    label: string;
    children: React.ReactNode;
    className?: string;
    required?: boolean;
} & React.LabelHTMLAttributes<HTMLLabelElement>;
/**
 * A field label component, using the FieldLabelProps type.
 * @param label The label text.
 * @param required Whether the field is required.
 * @param children The child elements.
 * @param className The class name.
 * @param props The remaining props.
 * @returns The field label component.
 */
export function FieldLabel({ 
  label, 
  required = false,
  children, 
  className, 
  ...props 
}: FieldLabelProps) {
  return (
    <label 
      className={`flex flex-col gap-2 text-lg font-medium ${className ?? ''}`} 
      {...props}
    >
      <span>
        {label}
        {required && <span className="text-red-500">*</span>}
      </span>
      {children}
    </label>
  );
}
