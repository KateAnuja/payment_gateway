import { defaultMetadataStorage as classTransformerMetadataStorage } from 'class-transformer/storage';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import { getFromContainer, MetadataStorage } from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import { getMetadataArgsStorage } from 'routing-controllers';``
import * as swaggerUi from 'swagger-ui-express';
import basicAuth from 'express-basic-auth';

export const swaggerLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings) {
        const expressApp = settings.getData('express_app');

        const { validationMetadatas } = getFromContainer(
            MetadataStorage
        ) as any;

        const schemas = validationMetadatasToSchemas(validationMetadatas,{
            classTransformerMetadataStorage,
            refPointerPrefix:'#/components/schemas/'
        })

        const swaggerFile = routingControllersToSpec(
            getMetadataArgsStorage(),
            {},
            {
                components: {
                    schemas,
                    securitySchemes: {
                        basicAuth: {
                            type: 'http',
                            scheme: 'basic',
                        },
                    },
                },
            }
        );

        swaggerFile.info = {
            title: "Title",
            description: "Description",
            version: "Version",
        };

        expressApp.use(
            '/swagger',
            basicAuth({
                users: {
                    [`admin`]: `1234`,
                },
                challenge: true,
            }),
            swaggerUi.serve,
            swaggerUi.setup(swaggerFile)
        );

    }
}