const debug = (...args) => {
    console.debug('DEBUG:', ...args);
};

const info = (...args) => {
    console.info('INFO:', ...args);
};

const warn = (...args) => {
    console.warn('WARNING:', ...args);
};

const error = (...args) => {
    console.error('ERROR:', ...args);
};

module.exports = {
    debug,
    info,
    warn,
    error
};
