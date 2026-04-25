const fs = require('fs');
const path = require('path');

console.log("Normalizing files in INCENDIOS_207_2025...");
const incDir = path.join('assets', 'INCENDIOS_207_2025');
if (fs.existsSync(incDir)) {
    fs.readdirSync(incDir).forEach(file => {
        const filePath = path.join(incDir, file);
        if (!fs.statSync(filePath).isDirectory() && !file.includes('.')) {
            // Assume it's a jpeg image
            const newPath = filePath + '.jpg';
            fs.renameSync(filePath, newPath);
            console.log(`Renamed: ${file} -> ${file}.jpg`);
        }
    });
}

console.log("Applying naming convention to photos...");
const photosDir = path.join('assets', 'photos');
const mapping = {};
if (fs.existsSync(photosDir)) {
    fs.readdirSync(photosDir).forEach(file => {
        const ext = path.extname(file);
        const basename = path.basename(file, ext);
        
        let newName;
        // Specific mapping for the generic year.png
        if (basename.match(/^\d{4}$/)) {
            newName = `${basename}-incendio-galicia${ext.toLowerCase()}`;
        } else {
            // General normalization: lowercase, replace spaces/underscores with hyphens
            newName = basename.toLowerCase()
                              .replace(/[^a-z0-9]+/g, '-')
                              .replace(/^-+|-+$/g, '') + ext.toLowerCase();
        }
        
        if (newName !== file && newName !== ext.toLowerCase()) {
            const oldPath = path.join(photosDir, file);
            const newPath = path.join(photosDir, newName);
            if (!fs.existsSync(newPath)) {
                fs.renameSync(oldPath, newPath);
                mapping[file] = newName;
                console.log(`Renamed: ${file} -> ${newName}`);
            }
        }
    });
}

// Update data.js with new names
console.log("Updating data.js references...");
const dataJsPath = path.join('src', 'web', 'data.js');
if (fs.existsSync(dataJsPath)) {
    let content = fs.readFileSync(dataJsPath, 'utf8');
    
    // Specifically update the exact matches we know we changed
    Object.keys(mapping).forEach(oldName => {
        const regex = new RegExp(oldName.replace(/\\./g, '\\.'), 'g');
        content = content.replace(regex, mapping[oldName]);
    });
    
    // Also update any incendios-galicia.jpg to the normalized name if it was renamed
    if (mapping['incendios-galicia.jpg']) {
        content = content.replace(/incendios-galicia\.jpg/g, mapping['incendios-galicia.jpg']);
    }
    
    fs.writeFileSync(dataJsPath, content);
    console.log("Updated data.js");
}

console.log("Done.");
