interface EnvConfig {
  readonly API_URL: string
}

function loadEnv(): EnvConfig {
  const rawEnv = import.meta.env

  const config: EnvConfig = {
    API_URL: rawEnv.VITE_API_URL ?? window.location.origin,
  }

  return config
}

export const envConfig = loadEnv()
export default envConfig
