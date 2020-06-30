export type ValidatorsType = (value: string) => string | undefined

export const required: ValidatorsType = value => value ? undefined : '! Required';

export const maxTextLength = (max: number): ValidatorsType => value =>
    value && value.length > max ? `! Must be ${max} characters or less` : undefined;

export const notEmail: ValidatorsType = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? '! Invalid email address'
        : undefined;
