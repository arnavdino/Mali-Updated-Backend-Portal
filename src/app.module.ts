import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './authentication/auth.module';
import { JwtAuthGuard } from './authentication/jwt-auth.gard';
import { UsersModule } from './users/users.module';
import dbConfiguration from './db/db.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { RolesGuard } from './authentication/role.guard';
import { HelpersModule } from './helpers/helpers.module';
import { StripeModule } from './stripe/stripe.module';
import { EmailsModule } from './emails/emails.module';
import { EventsModule } from './events/events.module';
import { ProductModule } from './product/product.module';
import { RoleModule } from './roles/role.module';
import { PurchaseModule } from './purchase/purchase.module';
import { PromotionModule } from './promotion/promotion.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { VendorModule } from './vendor/vendor.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.override', '.env', '.env.aws'],
      load: [dbConfiguration],
    }), // .env.override takes priority when duplicates exist
    TypeOrmModule.forRootAsync({
      // TODO: Take out to ormconfig.js or config file
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
      inject: [ConfigService],
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    AuthModule,
    UsersModule,
    HelpersModule,
    StripeModule,
    EventsModule,
    EmailsModule,
    ProductModule,
    RoleModule,
    PurchaseModule,
    PromotionModule,
    AnalyticsModule,
    VendorModule,
    TransactionsModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
