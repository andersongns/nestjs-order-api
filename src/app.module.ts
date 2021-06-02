import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesModule } from './clientes/clientes.module';
import { ProdutosModule } from './produtos/produtos.module';
import env from './config/env';
@Module({
  imports: [
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
