import { createLogger } from 'redux-logger';

const logger = createLogger({
  collapsed: true,
  titleFormatter: (action, time, took) => `action ${action.type} @ ${time} (in ${took.toFixed(2)} ms)`,
});

export default logger;
