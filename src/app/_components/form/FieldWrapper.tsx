import type { FieldWrapperProps } from "~/types/props";

export const FieldWrapper = ({
    label,
    className,
    error,
    children,
}: FieldWrapperProps) => (
    <div>
        <label
            className={`block p-0 text-sm font-medium text-gray-700 ${className}`}
        >
            {label}
            <div className="mt-1">{children}</div>
        </label>
        {error?.message &&
            (typeof error.message !== "string" ? (
                <ul className="mt-2 text-sm text-red">
                    {Object.keys(error.message).map((m, i) => {
                        const { pass, message } = (error.message as any)[m];

                        return (
                            <li key={i}>
                                <span>{pass ? "✅" : "❌"}</span>
                                <span>{message}</span>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <div
                    role="alert"
                    aria-label={error.message}
                    className="text-sm font-semibold text-red"
                >
                    {error.message}
                </div>
            ))}
    </div>
);
