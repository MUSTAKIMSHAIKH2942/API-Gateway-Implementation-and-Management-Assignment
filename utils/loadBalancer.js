// utils/loadBalancer.js
let currentBackendIndex = 0;

const getNextBackendServer = (backendServers) => {
    const server = backendServers[currentBackendIndex];
    currentBackendIndex = (currentBackendIndex + 1) % backendServers.length;
    return server;
};

module.exports = { getNextBackendServer };