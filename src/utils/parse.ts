export function parseJsonAsArray<T>(json: string): T[] {
  const results = JSON.parse(json);

  if (!results || typeof results !== 'object') {
    throw new Error(`Invalid json input, ${results}`);
  }

  return Array.isArray(results)
    ? results
    : Object.values(results).find(Array.isArray) || [];
}

export function parseJson<T>(json: string, searchProperty?: string): T {
  try {
    const result = JSON.parse(json);

    if (!result || typeof result !== 'object') {
      throw new Error(`Invalid json input, ${result}`);
    }

    if (!searchProperty) return result;

    if (searchProperty in result) {
      return result;
    }

    const data: T | undefined = Object.values(result).find(
      (value) => value && typeof value === 'object' && searchProperty in value,
    ) as any;

    if (data) return data;

    throw new Error(`Couldn't find [${searchProperty}] inside the json`);
  } catch (err) {
    console.log(err, 'error in parsing json');

    return parseJsonWithCleaning(json);
  }
}

function parseJsonWithCleaning<T>(json: string): T {
  const cleanedJson = json
    .replace(/^([^{\[]+)/g, '') // remove all the text that are before the valid JSON
    .replace(/([^}\]]+)$/g, ''); // remove all the text that are after the valid JSON

  return JSON.parse(cleanedJson);
}
