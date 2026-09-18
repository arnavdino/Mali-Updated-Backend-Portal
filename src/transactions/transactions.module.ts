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
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transactions, User, Product]),
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
