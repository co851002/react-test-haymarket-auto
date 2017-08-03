export const lazyFunction = function(f) {
  return function () {
    return f().apply(this, arguments);
  };
};
