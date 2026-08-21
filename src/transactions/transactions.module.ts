import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from 'src/events/events.module';
import { UsersModule } from '../users/users.module';
import { HelpersModule } from 'src/helpers/helpers.module';
import { Transactions } from './transactions.entity';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TransactionsProfile } from './transactions.mapper';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transactions]),
    HelpersModule,
    EventsModule,
    CaslModule,
    UsersModule
  ],
  providers: [TransactionsService, TransactionsProfile],
  controllers: [TransactionsController],
  exports: [TransactionsService],
})
export class TransactionsModule {}
