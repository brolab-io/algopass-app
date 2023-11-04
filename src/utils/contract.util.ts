export const isProfileNotFound = (error: any) => {
  if ("status" in error && error.status === 404) {
    return true;
  }
  if ("message" in error && error.message.includes("dynamic index segment miscalculation")) {
    return true;
  }
  return false;
};
