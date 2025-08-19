import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
// import { TasksModule } from './tasks/tasks.module';
import { UserEntity } from './users/users.entity';
// import { TaskEntity } from './tasks/tasks.entity';

@Module({
  imports: [
    UsersModule,
    // TasksModule,

    // PostgreSQL
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST!,
      port: parseInt(process.env.POSTGRES_PORT!, 10),
      username: process.env.POSTGRES_USER!,
      password: process.env.POSTGRES_PASSWORD!,
      database: process.env.POSTGRES_DB!,
      entities: [UserEntity],
      synchronize: true,
    }),


    MongooseModule.forRoot(
        `mongodb://root:rootpassword@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`
    )


  ],
})
export class AppModule {}
