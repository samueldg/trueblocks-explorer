const requiredMessage = 'This field is required';

/**
 * cannot be empty, must start with ‘0x’, must be 42 hex characters long,
 */
export const addressConstraints = {
  required: requiredMessage,
  pattern: {
    value: /^0x[a-f0-9]{40}$/i,
    message: `Must be 42 characters long hex and start with ‘0x’`,
  },
};

/**
 * cannot be empty. allow at least one unicode letter class, then
 * optionally spaces, letters and numbers
 */
export const nameConstraints = {
  required: requiredMessage,
  pattern: {
    value: /^[\p{L}]+[\p{L}\s0-9]*$/iu,
    message: `Should be a name, e.g. 'My Name 1'`,
  },
};

/**
 * comma separated list of user defined non-space-containing words
 */
export const tagsConstraints = {
  pattern: {
    value: /^([a-z0-9]+(,[\s]*)?)*$/i,
    message: 'Comma separated list of user defined non-space-containing words',
  },
};

export const typeToConstraints = new Map([
  ['address', addressConstraints],
  ['name', nameConstraints],
  ['tags', tagsConstraints],
]);
