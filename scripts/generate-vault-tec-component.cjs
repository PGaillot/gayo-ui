const { exec } = require('child_process');
const fs = require('fs');
const util = require('util');
const execPromise = util.promisify(exec);
const writeFilePromise = util.promisify(fs.writeFile);
const path = require('path');
const { readFileSync, writeFileSync } = require("fs");

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

    console.log('Performing additional tasks...');

    const projectRoot = process.cwd();
    console.log("projectRoot :", projectRoot);
    const componentPath = path.join(projectRoot, 'projects', 'gayo-lib', 'src', 'stories', 'vault-tec');    
    const infoFilePath = path.join(componentPath, `${componentName}.stories.ts`);

    const componentClassName = camelToPascal(componentName) + 'Component';

    const infoContent = `
// Component ${componentName} was generated on ${new Date()}

import { Meta, StoryObj } from "@storybook/angular";
import { ${componentClassName} } from "../../lib/components/vault-tec/${camelToKebab(componentName)}/${camelToKebab(componentName)}.component";


const meta:Meta<${componentClassName}> = {
  title:'Vault-Tec/${camelToPascal(componentName)}',
  component:${componentClassName},
  tags: ['autodocs'],
}

export default meta;

type Story = StoryObj<${componentClassName}>;

export const Simple${camelToPascal(componentName)}:Story = {
  args:{
      // vos arguments ici
  }
}
    `;
    await writeFilePromise(infoFilePath, infoContent);
    console.log(`Info file created at: ${infoFilePath}`);
    
    await updateStyle(componentName);
    await fixBaliseName(camelToKebab(componentName));

  } catch (error) {
    console.error('An error occurred:', error);
  }
}

generateComponent();

function camelToKebab(str) {
  return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')  // Ajoute un tiret entre une lettre minuscule suivie d'une majuscule
      .toLowerCase();                       // Convertit le tout en minuscules
}

function camelToPascal(str) {
  return str
      .replace(/(^\w|[A-Z]|\b\w)/g, (match) => match.toUpperCase())  // Met en majuscule la première lettre de chaque mot
      .replace(/([a-z])([A-Z])/g, '$1 $2')                           // Ajoute un espace entre les mots (optionnel)
      .replace(/\s+/g, '');                                          // Supprime tous les espaces
}



/**
 * 
 * @param {*} componentName 
 */
async function updateStyle(componentName) {
  const filePath = path.join(process.cwd(), 'projects', 'gayo-lib', 'src', 'lib', 'components', 'vault-tec', `${camelToKebab(componentName)}`);
  const styleFilePath = path.join(filePath, `${camelToKebab(componentName)}.component.scss`);
  const styleContent = 
  `/* Component ${camelToKebab(componentName)} was generated on ${new Date()} */
    
@import '../../../../lib/styles/vault-tec.scss';

    `
  try {
    writeFileSync(styleFilePath, styleContent);

    // Rename the TypeScript file
    const typeScriptFilePath = path.join(filePath, `${camelToKebab(componentName)}.component.ts`);
    const tsContent = fs.readFileSync(typeScriptFilePath, 'utf-8');
    const updateTs = tsContent.replace(`styleUrl: './${camelToKebab(componentName)}.component.css'`, `styleUrl: './${camelToKebab(componentName)}.component.scss'`); 
    writeFileSync(typeScriptFilePath, updateTs);


    console.log(`File renamed to: ${styleFilePath}`);
  } catch (error) {
    console.error('An error occurred while renaming the file:', error);
  }
}


/**
 * 
 * @param {*} filePath 
 * @param {*} content 
 */
async function createdFile(filePath, content) {  
  try {
    await fs.promises.writeFile(filePath, content);
    console.log(`File created at: ${filePath}`);
  } catch (error) {
    console.error('An error occurred while creating the file:', error);
  }
}

/**
 * 
 * @param {*} componentName 
 */
async function fixBaliseName(componentName) {

  const filePath = path.join(process.cwd(), 'projects', 'gayo-lib', 'src', 'lib', 'components', 'vault-tec', `${componentName}`);

  try {
    const typeScriptFilePath = path.join(filePath, `${componentName}.component.ts`);
    const tsContent = fs.readFileSync(typeScriptFilePath, 'utf-8');
    const updateTs = tsContent.replace(`selector: 'lib-${componentName}',`, `selector: 'vt-${componentName}',`); 
    writeFileSync(typeScriptFilePath, updateTs);


    console.log(`File updated at: ${typeScriptFilePath}`);

  } catch (error) {
    console.error('❌ An error occurred:', error);
  }

}
