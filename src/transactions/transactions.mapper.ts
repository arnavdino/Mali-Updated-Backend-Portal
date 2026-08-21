import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { TransactionsDto } from './transactions.dto';
import { Transactions } from './transactions.entity';

@Injectable()
export class TransactionsProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, TransactionsDto, Transactions);
      createMap(mapper, Transactions, TransactionsDto);
    };
  }
}
