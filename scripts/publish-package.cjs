const { execSync } = require("child_process");
const { resolve } = require("path");
const githubToken = process.env.GH_TOKEN;
const path = require('path');
const owner = process.env.OWNER;
const repo = process.env.REPO;


(async () => {
    const { Octokit } = await import("octokit");
    const octokit = new Octokit({ auth: githubToken });
    publishLib();

    async function publishLib() {


        try {
            await updateVersion();
            console.log('publishing lib...');
            const pullRequests = await getPullRequests();
            console.log('getPullRequests ...');
            console.log(pullRequests[0]);

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
            base: "main",
            sort: "updated",
            direction: "desc",
            per_page: 1, 
        });

        console.log('pullRequests');
        console.log(pullRequests);
        

        return pullRequests;
    }
})();