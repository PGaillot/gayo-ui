const { execSync } = require("child_process");
const { resolve } = require("path");
const githubToken = process.env.GH_TOKEN;
const path = require('path');
const owner = process.env.OWNER;
const repo = process.env.REPO;
const fs = require('fs');
const { readFileSync, writeFileSync } = fs;

(async () => {
    const { Octokit } = await import("octokit");
    const octokit = new Octokit({ auth: githubToken });
    publishLib();

    async function publishLib() {


        try {
            await updateVersion();
            console.log('publishing lib...');
            const pullRequests = await getPullRequests();
            writeChanges(pullRequests[0]);

        } catch (error) {
            console.error('❌ publish lib error :', error);
        }
    }


    /**
     * Updates the version of the library by executing the npm version patch command.
     *
     * @async
     * @function updateVersion
     * @return {void}
     */
    async function updateVersion() {
        try {
            const libPath = path.join(process.cwd(), 'projects', 'gayo-lib');
            execSync("cd " + libPath + " && npm version patch",
                {
                    stdio: "inherit",
                });
        } catch (error) {
            console.error('❌ update version error :', error);
        }
    }

    async function getPullRequests() {

        const { data: pullRequests } = await octokit.rest.pulls.list({
            owner,
            repo,
            state: "closed",
            base: "master",
            sort: "updated",
            direction: "desc",
            per_page: 1,
        });

        return pullRequests;
    }


    async function writeChanges(pullRequest) {
        console.log(pullRequest)
        let version

        try {

            const packageJsPath = path.join(process.cwd(), 'projects', 'gayo-lib', 'package.json');
            const packageJsContent = fs.readFileSync(packageJsPath, 'utf-8');
            const packageJs = JSON.parse(packageJsContent);
            version = packageJs.version;
        } catch (error) {
            console.error('❌ get package version error :', error);
        }
        
        try {
            const changesLogPath = path.join(process.cwd(), 'projects', 'gayo-lib', 'CHANGELOG.md');
            const changesLogContent = fs.readFileSync(changesLogPath, 'utf-8');
            const newChangeLog = `

    ### [${version}] - ${ pullRequest.created_at.split('T')[0] }
    author: ${author} 
    ${pullRequest.body}
            `;
            const newChangesLogContent = changesLogContent + newChangeLog;
            await writeFileSync(changesLogPath, newChangesLogContent, "utf8");
        } catch (error) {
            console.error('❌ write changes error :', error);
        }
    }

})();