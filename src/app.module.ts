import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesModule } from './clientes/clientes.module';
import { ProdutosModule } from './produtos/produtos.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

import env from './config/env';
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: env.mailer.host,
        port: env.mailer.port,
        ignoreTLS: true,
        secure: false,
        auth: {
          user: env.mailer.user,
          pass: env.mailer.pass,
        },
      },
      defaults: {
        from: '"No Reply" <no-reply@localhost>',
      },
      template: {
        dir: `${__dirname}/templates/email`,
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: env.database.host,
      port: env.database.port,
      username: env.database.username,
      password: env.database.password,
      database: env.database.database,
      keepConnectionAlive: true,
      entities: [__dirname + '/../**/**/*.entity.{js,ts}'],
      synchronize: false,
    }),
    ClientesModule,
    ProdutosModule,
    PedidosModule,
    MailerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
