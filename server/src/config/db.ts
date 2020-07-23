class RedisConfig {
    public port: number;
    public host: string;
    constructor(port: number, host: string) {
        this.port = port;
        this.host = host;
    }
}

class MongoConfig {
    private dbs: string;
    constructor(dbs: string) {
        this.dbs = dbs;
    }
    getDbs(): string {
        return this.dbs;
    }
}

let REDIS_CONF: RedisConfig;
let MONGO_CONF: MongoConfig;
const env = process.env.NODE_ENV;

if (env === 'dev') {
    REDIS_CONF = new RedisConfig(6379, '127.0.0.1');
    MONGO_CONF = new MongoConfig('mongodb://127.0.0.1:27017/dbs');
}

if (env === 'production') {
    REDIS_CONF = new RedisConfig(6379, '127.0.0.1');
    MONGO_CONF = new MongoConfig('mongodb://127.0.0.1:27017/dbs');
}

export { REDIS_CONF, MONGO_CONF };
