export const REQUIRED = (param: string, prefix?: string, suffix?: string) =>
  `${prefix ? `${prefix} ` : ""}${param} is required${
    suffix ? ` ${suffix}` : ""
  }`;
export const MIN = (param: string, min: number = 1) =>
  `At least ${min} ${param}(s) required`;
export const MAX = (param: string, max: number = 1) =>
  `Maximum ${max} ${param}(s) required`;
