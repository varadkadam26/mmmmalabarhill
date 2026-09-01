const fs = require('fs');
let lines = fs.readFileSync('public/js/i18n.js', 'utf8').split('\n');
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('reg_label:') && lines[i].includes('mandal_name_header:')) {
        lines[i] = '    reg_label: "नोंदणी क्र. : ई-३८९२ मुंबई",\n    mandal_name_header: "मलबार हिलचा राजा",';
    }
    if (lines[i].includes('pickup_courier:') && lines[i].includes('All India')) {
        lines[i] = '    color_cream: "अधिकृत क्रीम (क्रीम पोलो व हिरवा कॉलर)", color_maroon: "रॉयल मरून", color_saffron: "भगवा", pickup_mandap: "मंडप काउंटर पिकअप (मलबार हिल)", pickup_courier: "होम कूरियर डिलिव्हरी (All India)",';
    }
    if (lines[i].includes('window.location.reload();')) {
        lines[i] = lines[i].replace('window.location.reload();', 'setLanguage(l);');
    }
}
fs.writeFileSync('public/js/i18n.js', lines.join('\n'), 'utf8');
