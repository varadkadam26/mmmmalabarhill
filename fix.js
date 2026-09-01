const fs = require('fs');
let content = fs.readFileSync('public/js/i18n.js', 'utf8');

content = content.replace(/reg_label:\s*"[^"]+mandal_name_header:/g, 'reg_label: "नोंदणी क्र. : ई-३८९२ मुंबई",\n    mandal_name_header:');
content = content.replace(/pickup_courier: "होम कूरियर डिलिव्हरी \(All India\)",[^"]+",/g, 'pickup_courier: "होम कूरियर डिलिव्हरी (All India)",');
content = content.replace('window.location.reload();', 'setLanguage(l);');

fs.writeFileSync('public/js/i18n.js', content, 'utf8');
