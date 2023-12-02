import { FieldWrapper } from ".";
import type { TextFieldProps } from "~/types/props";

export const TextField = ({
    label,
    description,
    error,
    registration,
    className,
    isPassword,
    isEmail,
    ...rest
}: TextFieldProps) => (
    <FieldWrapper label={label} error={error} description={description}>
        <input
            type={isPassword ? "password" : isEmail ? "email" : "text"}
            className={`focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none sm:text-sm ${className}`}
            {...registration}
            {...rest}
        />
    </FieldWrapper>
);
