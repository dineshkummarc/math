/**
 * Build profile for gladius. Replaces the use of requirejs with an AMD
 * loader shim, almond.js, since the built file does not need to use
 * all of requirejs.
 */
({
  // Where to find the module names listed below.
  baseUrl: '../src',

  // Where to find modules that are outside of src.
  // This setup assumes CubicVR.js is the built output,
  // so this build file assumes make has already run in CubicVR.js
  paths: {
  },

  // Do not minify with the requirejs optimizer, to allow shipping
  // a non-minified and minified version. The Makefile will do the
  // minification.
  optimize: 'none',

  // Target the AMD loader shim as the main module to optimize,
  // so it shows up first in the built file,
  // since the gladius modules use the define/require APIs that the almond
  // provides. Path is relative to baseUrl.
  name: '../tools/almond',

  // Files to include along with almond. Their nested dependencies will also be
  // included.
  include: [
            '_math'
           ],

  // Wraps the built file in a closure and exports gladius as a global.
  wrap: {
    startFile: 'wrap.start',
    endFile: 'wrap.end'
  },

  // The built gladius.js file for use by web sites.
  out: '../dist/_math.js'
})
