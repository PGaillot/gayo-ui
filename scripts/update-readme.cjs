const { execSync } = require("child_process");
const { resolve } = require("path");
const path = require('path');
const fs = require('fs');
const { readFileSync, writeFileSync } = fs;

(async () => {
    const maxlogs = 3;
    let logs = [];

    const libPath = path.join(process.cwd(), 'projects', 'gayo-lib');
    const changesLogPath = path.join(libPath, 'CHANGELOG.md');
    const readmeLibPath = path.join(libPath, 'README.md');
    const readmePath = path.join(process.cwd(), 'README.md');

    try {
        const changesLogContent = fs.readFileSync(changesLogPath, 'utf-8');
        let sections = changesLogContent.split('---').filter(section => section.trim());
        
        // Récupérer les 3 derniers logs
        logs = sections.slice(-maxlogs).reverse().map(section => section.trim() + '\n\n---\n');

        console.log(logs);

        try {
            const readmeContent = fs.readFileSync(readmeLibPath, 'utf-8');
            const firstReadMeChangesline = '## 📚 Changelogs';
            const lastReadMeChangesline = '[Voir plus...](CHANGELOG.md)';

            // Diviser le fichier en 2 parties, avant les logs et après les logs
            const [firstReadme, rest] = readmeContent.split(firstReadMeChangesline);
            const lastReadme = rest.split(lastReadMeChangesline)[1];
            
            const newReadme =
                firstReadme.trim() +
                '\n\n' +
                firstReadMeChangesline +
                '\n\n' +
                logs.join('\n') +
                lastReadMeChangesline +
                '\n\n' +
                lastReadme.trim();

            writeFileSync(readmeLibPath, newReadme, "utf8");
            writeFileSync(readmePath, newReadme, "utf8");

            console.log('✅ README files updated successfully');

        } catch (error) {
            console.log('❌ Write changes in README error:', error);
        }

    } catch (error) {
        console.log(`❌ Get the ${maxlogs} last changes in CHANGELOG:`, error);
    }
})();