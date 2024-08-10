import { execSync } from 'child_process';
import path from 'path';
import { Octokit } from '@octokit/rest';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const githubToken = process.env.GH_TOKEN;
const owner = 'votre-nom-utilisateur-github';
const repo = 'gayo-ui';

(async () => {
  try {
    const octokit = new Octokit({ auth: githubToken });
    await publishLib(octokit);
  } catch (error) {
    console.error('❌ Main script error:', error);
    process.exit(1);
  }
})();

async function publishLib(octokit) {
  try {
    await updateVersion();
    const pullRequests = await getPullRequests(octokit);
    console.table(pullRequests[0]);
  } catch (error) {
    console.error('❌ publish lib error:', error);
    throw error;
  }
}

async function updateVersion() {
  try {
    const libPath = path.join(__dirname, '..', 'projects', 'gayo-lib');
    execSync(`cd ${libPath} && npm version patch`, { stdio: "inherit" });
  } catch (error) {
    console.error('❌ update version error:', error);
    throw error;
  }
}

async function getPullRequests(octokit) {
  const { data: pullRequests } = await octokit.rest.pulls.list({
    owner,
    repo,
    state: "closed",
    base: "main",
    sort: "updated",
    direction: "desc",
    per_page: 1,
  });
  return pullRequests;
}