module.exports = function (eleventyConfig) {
  eleventyConfig.addNunjucksGlobal("nunjucksVersion", () => {
    // Find the package version of the currently installed Nunjucks lib.
    const ver = require("nunjucks/package.json").version;
    return ver;
  });

  eleventyConfig.addNunjucksGlobal("env", function (key, def) {
    return process.env[key] || def;
  });

  eleventyConfig.addNunjucksGlobal("syncFn", function (a, b) {
    // Add two numbers, concatenate two strings, whatever...
    return a + b;
  });

  eleventyConfig.addNunjucksGlobal("asyncFn", async function (a, b) {
    // Async function that returns a Promise.
    return Promise.resolve(a)
      .then(c => b + c);
  });

  eleventyConfig.addNunjucksAsyncFilter("resolve", async function (value, cb) {
    // Nunjucks async filter w/ async function that awaits the return
    // value then passes to callback function.
    cb(null, await value);
  });

  return {
    dir: {
      input: "src",
      output: "www",
    }
  };
};
