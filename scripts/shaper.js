import fs from 'fs/promises';
import path from 'path';

const inputFilePath = path.join(process.cwd(), 'data', 'tokens.json');

/*
This script transforms and reshapes token data to meet front-end (FE) requirements, 
facilitating proper handling and CSS style generation. This adjustment addresses limitations on the design side,
ensuring that designers can seamlessly integrate and use the tokens in new designs.
*/

const transformValueKeys = (obj, rootKey, currentPath = '') => {
  for (const [key, value] of Object.entries(obj)) {
    const newPath = currentPath ? `${currentPath}.${key}` : key;

    if (key === 'value' && typeof value === 'object' && value !== null && !Array.isArray(value)) {
      // Check if the object contains a "type" property
      if (!value.hasOwnProperty('type')) {
        // Log the current structure before transformation
        console.log(`Found "value" at ${rootKey}.${newPath}. Replacing with:`);

        // Create a new object to hold the transformed structure
        const transformedObject = {};

        // Transform each property of the "value" object
        for (const [subKey, subValue] of Object.entries(value)) {
          transformedObject[subKey] = { value: subValue };
        }

        // Replace the "value" key with the transformed structure
        console.log(transformedObject);
        Object.assign(obj, transformedObject);

        // Delete the old "value" key
        delete obj[key];
      }
    } else if (typeof value === 'object' && value !== null) {
      // Recursively process nested objects
      transformValueKeys(value, rootKey, newPath);
    }
  }
};

async function processJson() {
  try {
    // Read the input JSON file
    const jsonData = JSON.parse(await fs.readFile(inputFilePath, 'utf8'));

    // Transform the JSON data, assuming the root key is empty for the root level
    transformValueKeys(jsonData, 'root');

    // Write the updated JSON to the output file
    await fs.writeFile(inputFilePath, JSON.stringify(jsonData, null, 2), 'utf8');
    console.log('JSON transformation complete. Updated file saved as tokens-updated.json');
  } catch (error) {
    console.error('Error processing JSON file:', error);
  }
}

processJson();
