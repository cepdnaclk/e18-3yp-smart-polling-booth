const noop = () => {};

export const ENABLE_AUTH = process.env.NEXT_PUBLIC_ENABLE_ZALTER_AUTH === "true";

export const auth = ENABLE_AUTH ? noop() : noop();
