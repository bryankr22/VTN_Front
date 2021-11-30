export const truncate = (input: string) =>
  input.length > 9 ? `${input.substring(0, 9)}...` : input;
