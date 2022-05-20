import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import path from 'path';
import glob from 'glob';

export const eventDispatchLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings) {
        const patterns = [path.join(__dirname, '..', 'api/subscribers/**/*Subscriber.js')];
        patterns.forEach((pattern) => {
            glob(pattern, (err: any, files: string[]) => {
                for (const file of files) {
                    require(file);
                }
            });
        });
    }
}