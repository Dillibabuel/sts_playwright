export type StsRuntimeConfig = {
  baseUrl: string;
  username: string;
  password: string;
};

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function getStsRuntimeConfig(): StsRuntimeConfig {
  return {
    baseUrl: process.env.STS_BASE_URL?.trim() || 'http://localhost/sts/',
    username: requireEnv('STS_USERNAME'),
    password: requireEnv('STS_PASSWORD'),
  };
}
