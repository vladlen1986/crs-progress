/* Assembles parts/* into the single self-contained prototype file. */
const fs = require('fs'), p = require('path');
const dir = p.join(__dirname, 'parts');
const R = f => fs.readFileSync(p.join(dir, f), 'utf8');

const html = `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>User Management — CRS Prototype</title>
<!-- Self-contained: no external fonts, images or scripts. Works over file://. -->
<style>
${R('01-theme-base.css')}
${R('02-components.css')}
${R('03-shell-module.css')}
</style>
</head>
<body>
${R('05-body.html')}
<script>
${R('04-data.js')}
${R('06-app.js')}
${R('07-detail-profile.js')}
${R('08-modals-wiring.js')}
</script>
</body>
</html>
`;

const out = p.join(__dirname, 'user-management.html');
fs.writeFileSync(out, html);
console.log('built', out, (html.length/1024).toFixed(1) + ' KB');
