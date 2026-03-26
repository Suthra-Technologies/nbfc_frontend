const fs = require('fs');
const path = require('path');

function fixLabels(dir) {
    const files = [];
    function scan(d) {
        const items = fs.readdirSync(d);
        items.forEach(item => {
            const p = path.join(d, item);
            if (fs.statSync(p).isDirectory()) scan(p);
            else if (p.endsWith('.tsx')) files.push(p);
        });
    }
    scan(dir);

    files.forEach(file => {
        let content = fs.readFileSync(file, 'utf8');
        let initial = content;
        
        content = content.replace(/className="([^"]*)text-\[11px\]\s+font-bold\s+text-\[#64748b\]\s+uppercase\s+tracking-\[0\.05em\]([^"]*)"/g, (match, before, after) => {
            let newBefore = before.replace(/\bw-\d+\b/g, '').replace(/\bw-\[[^\]]+\]\b/g, '').replace(/\bwhitespace-nowrap\b/g, '').trim();
            let finalClass = `whitespace-nowrap w-36 ${newBefore} text-[11px] font-bold text-[#64748b] uppercase tracking-[0.05em]${after}`.replace(/\s+/g, ' ').trim();
            return `className="${finalClass}"`;
        });

        if (initial !== content) {
            console.log('Fixed labels in', file);
            fs.writeFileSync(file, content, 'utf-8');
        }
    });
}

fixLabels('d:/nbfc1/nbfc_frontend/src/pages');
