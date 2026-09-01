const fs = require('fs');
const path = require('path');
const CleanCSS = require('clean-css');
const Terser = require('terser');

async function minifyAll() {
  console.log('--- Starting Minification ---');

  // Minify CSS
  const cssPath = path.join(__dirname, 'public', 'css', 'style.css');
  const cssMinPath = path.join(__dirname, 'public', 'css', 'style.min.css');
  if (fs.existsSync(cssPath)) {
    const rawCss = fs.readFileSync(cssPath, 'utf8');
    const output = new CleanCSS({ level: 2 }).minify(rawCss);
    if (output.errors.length) {
      console.error('CSS Minify Errors:', output.errors);
    } else {
      fs.writeFileSync(cssMinPath, output.styles);
      console.log(`Minified style.css: ${rawCss.length} bytes -> ${output.styles.length} bytes`);
    }
  }

  // Minify JS files
  const jsFiles = ['main.js', 'i18n.js', 'donate.js', 'pass-form.js'];
  for (const file of jsFiles) {
    const jsPath = path.join(__dirname, 'public', 'js', file);
    const jsMinPath = path.join(__dirname, 'public', 'js', file.replace('.js', '.min.js'));
    if (fs.existsSync(jsPath)) {
      const rawJs = fs.readFileSync(jsPath, 'utf8');
      try {
        const minified = await Terser.minify(rawJs, {
          compress: true,
          mangle: true
        });
        if (minified.code) {
          fs.writeFileSync(jsMinPath, minified.code);
          console.log(`Minified ${file}: ${rawJs.length} bytes -> ${minified.code.length} bytes`);
        }
      } catch (err) {
        console.error(`Error minifying ${file}:`, err);
      }
    }
  }

  console.log('--- Minification Complete ---');
}

minifyAll();
