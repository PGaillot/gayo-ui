const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

const componentName = process.argv[2];

if (!componentName) {
  console.error('Please provide a component name');
  process.exit(1);
}

const command = `ng generate component components/vault-tec/${componentName} --project gayo-lib`;

async function generateComponent() {
  try {
    console.log('Starting component generation...');
    const { stdout, stderr } = await execPromise(command);
    console.log('Component generation completed.');
    console.log('stdout:', stdout);
    console.error('stderr:', stderr);
    
    // Vous pouvez ajouter ici d'autres actions à exécuter après la génération du composant
    console.log('Performing additional tasks...');
    // Par exemple :
    // await someOtherAsyncFunction();
    
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

generateComponent();