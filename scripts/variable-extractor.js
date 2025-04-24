import fs from 'fs/promises';
import path from 'path';

const inputFilePath = path.join(process.cwd(), 'data', 'tokens.json');
const transformedKeysPath = path.join(process.cwd(), 'data', 'transformed-keys.js');
const variablesPath = path.join(process.cwd(), 'data', 'variables.js');

const findAllReferences = (jsonData) => {
  const result = {};

  // Process direct style references
  const processDirectReferences = (obj, prefix = '') => {
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string' && value.match(/^[a-f0-9]{40}$/)) {
        console.log(`Found direct reference: ${key} -> ${value}`);
        result[value] = {
          originalKey: key,
          transformedKey: '--' + key.replace(/\./g, '-'),
          originalValue: value,
        };
      } else if (typeof value === 'object' && value !== null) {
        processDirectReferences(value, `${prefix}${key}.`);
      }
    }
  };

  // Process themes references
  if (Array.isArray(jsonData.$themes)) {
    console.log(`\nProcessing ${jsonData.$themes.length} themes:`);
    jsonData.$themes.forEach((theme, index) => {
      console.log(`\nTheme ${index + 1}: ${theme.name}`);

      if (theme.$figmaStyleReferences) {
        const refCount = Object.keys(theme.$figmaStyleReferences).length;
        console.log(`  Found ${refCount} figma style references`);

        for (const [refKey, refValue] of Object.entries(theme.$figmaStyleReferences)) {
          if (!refValue || typeof refValue !== 'string') continue;

          const cleanKey = refValue.replace(/^S:/, '').replace(/,$/, '');
          result[cleanKey] = {
            originalKey: refKey,
            transformedKey: '--' + refKey.replace(/\./g, '-'),
            originalValue: refValue,
          };
        }
      }
    });
  }

  // Process direct references in the root object
  console.log('\nProcessing direct references:');
  processDirectReferences(jsonData);

  return result;
};

async function generateFiles() {
  try {
    const jsonData = JSON.parse(await fs.readFile(inputFilePath, 'utf8'));
    const mappings = findAllReferences(jsonData);

    console.log(`\nTotal mappings found: ${Object.keys(mappings).length}`);

    // Generate transformed-keys.js
    //     const transformedKeysContent = `const transformedKeys = ${JSON.stringify(mappings, null, 2)};

    // export default transformedKeys;
    // `;

    // Generate variables.js
    const variables = {};
    for (const [key, value] of Object.entries(mappings)) {
      variables[key] = value.transformedKey;
    }
    const variablesContent = `const tokenVariables = ${JSON.stringify(variables, null, 2)};

export default tokenVariables;
`;

    // Write both files
    // await fs.writeFile(transformedKeysPath, transformedKeysContent, 'utf8');
    await fs.writeFile(variablesPath, variablesContent, 'utf8');

    console.log('Files generated successfully:');
    console.log('- data/transformed-keys.js');
    console.log('- data/variables.js');
  } catch (error) {
    console.error('Error generating files:', error);
  }
}

generateFiles();
