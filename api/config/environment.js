// Import configurations
import { environmentConfigurations } from './config'
const environment = process.env.NODE_ENV || 'development';

// Select environment mode
if (environment === 'development' || environment === 'test') {
  // Getting configurations
  try {
    var config = environmentConfigurations[environment]
  } catch(e) {
    console.error("Read section 'Environment Configurations' in the README.md" );
    process.exit(1)
  }

  // Set config on process.env
  for (let key in config) {
    process.env[key] = config[key]
  }
} else if (environment === 'production') {
  // Set new configurations
  var config = {
    jwtSecret: process.env.JWT_SECRET,
    mongoDBURI: process.env.MONGODB_URI,
    port: process.env.PORT,
  }

  // Validating configurations
  for (let key in config) {
    if (config[key] === undefined) {
      console.error(`Set the environment variable ${key} in production`)
      process.exit(1)
    }
  }
}

export {
  environment,
  config
}
