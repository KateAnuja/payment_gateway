
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import basicAuth from 'express-basic-auth';
const statusMonitor = require('express-status-monitor')();

export const monitorLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings) {
        const expressApp = settings.getData('express_app');
        expressApp.use(statusMonitor);
        expressApp.get(
            '/monitor',
            basicAuth({
                users: {
                    [`admin`]: `1234`,
                },
                challenge: true,
            }),
            statusMonitor.pageRoute
        );

    }
}