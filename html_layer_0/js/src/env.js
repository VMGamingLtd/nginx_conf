const ENVIRONMENT='local';

export function getEnvironment() {
  if (ENVIRONMENT === 'local') {
    return {
      gaosUrl: 'https://local.galacticodyssey.space/gaos',
    }
  } else if (ENVIRONMENT === 'test') {
    return {
      gaosUrl: 'https://test.galacticodyssey.space/gaos',
    }
  } else {
    throw new Error(`unknown environment: ${ENVIRONMENT}`);
  }
}


