import type { FieldWrapperProps } from "~/types/props";

export const FieldWrapper = (props: FieldWrapperProps) => {
    const { label, className, error, children } = props;
    return (
        <div>
            <label
                className={`block text-sm font-medium text-gray-700 ${className}`}
            >
                {label}
                <div className="mt-1">{children}</div>
            </label>
            {error?.message && (
                <div
                    role="alert"
                    aria-label={error.message}
                    className="text-red-500 text-sm font-semibold"
                >
                    {error.message}
                </div>
            )}
        </div>
    );
};
