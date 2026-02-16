export const vRequired = (v: string | number) => !!v || 'Field is required';

export const vMinLength = (min: number) => {
  return (v: string) => (v && v.length >= min) || `Must be minimum ${min} characters`;
};

export const vMaxLength = (max: number) => {
  return (v: string) => (v && v.length <= max) || `Mast be maximum ${max} characters`;
};
