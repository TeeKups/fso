const debug = (...args) => {
    process.env.DISABLE_LOGGER || console.debug('DEBUG:', ...args);
};

const info = (...args) => {
    process.env.DISABLE_LOGGER || console.info('INFO:', ...args);
};

const warn = (...args) => {
    process.env.DISABLE_LOGGER || console.warn('WARNING:', ...args);
};

const error = (...args) => {
    process.env.DISABLE_LOGGER || console.error('ERROR:', ...args);
};

module.exports = {
    debug,
    info,
    warn,
    error
};
