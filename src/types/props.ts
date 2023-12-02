import type React from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

export type ChildrenProps = {
    children: React.ReactNode;
};

export type ComponentStyleProps = {
    className?: string;
    style?: React.CSSProperties;
};

export type FieldWrapperProps = ComponentStyleProps & {
    label?: string;
    children: React.ReactNode;
    error?: FieldError | undefined;
    description?: string;
};

export type FieldWrapperPassThroughProps = Omit<
    FieldWrapperProps,
    "className" | "children"
>;

type TextFieldType =
    | {
          isPassword?: boolean;
          isEmail?: never;
      }
    | {
          isPassword?: never;
          isEmail?: boolean;
      };

export type TextFieldProps = FieldWrapperPassThroughProps &
    ComponentStyleProps &
    TextFieldType & {
        registration: Partial<UseFormRegisterReturn>;
        id?: string;
        name?: string;
        onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
        onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    };
