import {Module} from '@steroidsjs/nest/infrastructure/decorators/Module';
import coreModule from '@steroidsjs/nest-notifier';
import {MailerModule} from '@nestjs-modules/mailer';
import {PugAdapter} from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import {INotifierService} from '@steroidsjs/nest-modules/notifier/services/INotifierService';
import {ModuleHelper} from '@steroidsjs/nest/infrastructure/helpers/ModuleHelper';
import {NotifierService} from '@steroidsjs/nest-notifier/domain/services/NotifierService';
import {MailProvider} from '@steroidsjs/nest-notifier/domain/providers/MailProvider';
import {IMailService} from '@steroidsjs/nest-notifier/domain/interfaces/IMailService';
import MailService from '@steroidsjs/nest-notifier/infrastructure/services/MailService';

const DEFAULT_MAIL_PORT = '465';

@Module({
    ...coreModule,
    module: () => ({
        imports: [
            MailerModule.forRoot({
                transport: {
                    host: process.env.MAIL_HOST,
                    port: parseInt(process.env.MAIL_PORT ?? DEFAULT_MAIL_PORT, 10),
                    secure: true,
                    auth: {
                        user: process.env.MAIL_SENDER,
                        pass: process.env.MAIL_PASSWORD,
                    },
                },
                defaults: {
                    from: process.env.MAIL_SENDER,
                },
                template: {
                    dir: `${__dirname}/templates`,
                    adapter: new PugAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
        ],
        providers: [

            {
                provide: IMailService,
                useClass: MailService,
            },
            {
                provide: MailProvider,
                useClass: MailProvider,
            },
            {
                inject: [IMailService],
                provide: MailProvider,
                useFactory: (mailService) => new MailProvider(mailService),
            },
            ModuleHelper.provide(NotifierService, INotifierService, [
                [
                    MailProvider,
                ],
            ]),
        ],
        exports: [
            INotifierService,
        ],
    }),
})
export class NotifierModule { }
