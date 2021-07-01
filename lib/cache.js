const { promisify } = require('util');
const redis = require('redis');
const client = redis.createClient({ host: 'redis' });

// Promisify Redis client so we can continue using async/await syntax
const hmsetAsync = promisify(client.hmset).bind(client);
const hgetAsync = promisify(client.hget).bind(client);
const delAsync = promisify(client.del).bind(client);

export const setCache = async (key, value) => {
    return await hmsetAsync('cache', key, JSON.stringify(value));
};

export const getCache = async (key) => {
    return JSON.parse(await hgetAsync('cache', key));
};

// Return a cached value if it already exists, if not, then execute provided function, cache the result and return it
export const cachify = async (func, ...args) => {
    const key = `${func.name}` + JSON.stringify(args);
    const existing = await getCache(key);
    if (existing) {
        return existing;
    }
    return new Promise((resolve) => {
        func(...args).then(async (value) => {
            await setCache(key, value);
            resolve(value);
        });
    });
};

// We don't really have much pages here so with this volume it's ok to just clear all cache whenever there is a change
export const clearAllCache = async () => {
    return await delAsync('cache');
};
