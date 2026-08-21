import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from 'src/events/events.module';
import { HelpersModule } from 'src/helpers/helpers.module';
import { StripeModule } from 'src/stripe/stripe.module';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserProfile } from './user.mapper';
import { UsersService } from './users.service';
import { RoleModule } from 'src/roles/role.module';
import { FilesCommonModule } from 'src/common/file/file-common.module';
import { AdminUserController } from './admin-user.controller';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    HelpersModule,
    StripeModule,
    EventsModule,
    RoleModule,
    FilesCommonModule,
    CaslModule,
  ],
  providers: [UsersService, UserProfile],
  controllers: [UserController, AdminUserController],
  exports: [UsersService, TypeOrmModule.forFeature([User])],
})
export class UsersModule {
  constructor(private usersService: UsersService) {}
  async onModuleInit() {
    // this.usersService.loadDate();
  }
}
