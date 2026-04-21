import { utilities as nestWinstonModuleUtilities } from "nest-winston";
import * as winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const isDev = process.env.NODE_ENV !== "production";

const rotateFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json(),
);

// Console transport — pretty in dev, JSON in prod
const consoleTransport = new winston.transports.Console({
  format: isDev
    ? winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        nestWinstonModuleUtilities.format.nestLike("API", {
          colors: true,
          prettyPrint: true,
        }),
      )
    : winston.format.combine(winston.format.timestamp(), winston.format.json()),
});

// Daily rotate file transport — all levels
const fileTransport = new DailyRotateFile({
  dirname: "logs",
  filename: "api-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: false,
  maxSize: "20m",
  maxFiles: "14d",
  format: rotateFormat,
});

// Errors-only file — keep longer
const errorFileTransport = new DailyRotateFile({
  dirname: "logs",
  filename: "api-error-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  level: "error",
  zippedArchive: false,
  maxSize: "20m",
  maxFiles: "30d",
  format: rotateFormat,
});

export const winstonConfig: winston.LoggerOptions = {
  level: isDev ? "debug" : "info",
  transports: [consoleTransport, fileTransport, errorFileTransport],
};
