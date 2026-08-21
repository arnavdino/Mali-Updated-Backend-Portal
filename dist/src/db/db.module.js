"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('database', () => {
    return {
        type: 'mysql',
        logging: false,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '3306', 10),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        autoLoadEntities: true,
        charset: 'utf8mb4',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/../migrations/*{.ts,.js}'],
        cli: {
            migrationsDir: 'src/migrations',
        },
        migrationsTableName: 'migrations_history',
        timezone: 'local',
    };
});
//# sourceMappingURL=db.module.js.map