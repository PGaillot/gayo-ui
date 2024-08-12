const { execSync } = require("child_process");
const { resolve } = require("path");
const githubToken = process.env.GH_TOKEN;
const path = require('path');
const owner = process.env.OWNER;
const repo = process.env.REPO;
const fs = require('fs');
const { readFileSync, writeFileSync } = fs;

(async () => {

    const maxlogs = 3;
    let logsCount = -1;
    let logs = [];

    const libPath = path.join(process.cwd(), 'projects', 'gayo-lib');
    const changesLogPath = path.join(libPath, 'CHANGELOG.md');
    const readmeLibPath = path.join(libPath, 'README.md');
    const readmePath = path.join(process.cwd(), 'README.md');

    try {
        const changesLogContent = fs.readFileSync(changesLogPath, 'utf-8');
        let lines = changesLogContent.split('\n');
        let currentLog = [];

        lines.reverse().forEach((line) => {
            if (line.trim() === '---' && logsCount < maxlogs) {
                logsCount++;
                if (logsCount > 0) {
                    logs.push(currentLog.reverse().join('')); 
                }
            }
            if (logsCount < maxlogs) currentLog.push(line + '\n');
        });

        if (logsCount < maxlogs) {
            logs.push(currentLog.reverse().join(''));
        }

        console.log(logs);

        try {
            const readmeContent = fs.readFileSync(readmeLibPath, 'utf-8');
            const fisrtReadMeChangesline = '## 📚 Changelogs';
            const lastReadMeChangesline = '[Voir plus...](CHANGELOG.md)'

            // diviser le fichier en 2 parties, avant les logs est après les logs
            const firstReadme = readmeContent.split(fisrtReadMeChangesline)[0];
            const lastReadme = readmeContent.split(lastReadMeChangesline)[1];
            const newReadme =
                firstReadme +
                fisrtReadMeChangesline +
                '\n' +
                logs.join('\n')
                '\n' +
                lastReadMeChangesline +
                lastReadme;

            writeFileSync(readmeLibPath, newReadme, "utf8");
            writeFileSync(readmePath, newReadme, "utf8");

        } catch (error) {
            console.log('❌ write changes in README error :', error);
        }

    } catch (error) {
        console.log(`❌ Get the ${maxlogs} last changes in CHANGELOG :`, error);
    }

})();
