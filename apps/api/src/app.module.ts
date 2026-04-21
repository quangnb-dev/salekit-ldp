import type { LoggerService } from "@nestjs/common";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER } from "@nestjs/core";
import { WINSTON_MODULE_NEST_PROVIDER, WinstonModule } from "nest-winston";
import { AppController } from "./app.controller";
import { GlobalExceptionFilter } from "./common/filters/global-exception.filter";
import { winstonConfig } from "./common/logger/winston.config";
import { validateEnv } from "./config/env";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ["../../.env", ".env"],
      validate: validateEnv,
    }),
    WinstonModule.forRoot(winstonConfig),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useFactory: (logger: LoggerService) => new GlobalExceptionFilter(logger),
      inject: [WINSTON_MODULE_NEST_PROVIDER],
    },
  ],
})
export class AppModule {}
