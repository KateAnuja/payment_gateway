import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import { useContainer as classValidatorUseContainer } from 'class-validator';
import { useContainer as routingUseContainer } from 'routing-controllers';
// import { useContainer as typeGraphQLUseContainer } from 'type-graphql';
import { useContainer as ormUseContainer } from 'typeorm';
import { Container } from 'typeorm-typedi-extensions';

export const iocLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    routingUseContainer(Container);
    ormUseContainer(Container);
    classValidatorUseContainer(Container);
    //typeGraphQLUseContainer(Container);
}