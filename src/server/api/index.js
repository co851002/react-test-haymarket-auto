import config from './config';
import content from './content';

/**
 * Maps API endpoints for production and dev servers.
 * @param  {Object} server - express server instance that will get middleware applied to,
 * @return {void}
 */
const applyApi = (server) => {
  const apiMap = {
    '/api/config': config,
    '/api/content': content
  };
  for (let path in apiMap) {
    server.use(path, apiMap[path]);
  }
};

export default applyApi;