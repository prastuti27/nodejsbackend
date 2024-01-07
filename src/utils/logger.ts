import winston, { format } from "winston";
const logFormat = format.printf((info) => {
  const formattedNamespace = info.metadata.namespace || "";

  return `${info.timestamp} [${info.level}] [${formattedNamespace}]: ${info.message}`;
});

const logger = winston.createLogger({
  format: format.combine(
    winston.format.timestamp(),
    format.metadata({ fillExcept: ["message", "level", "timestamp"] }),
    logFormat
  ),

  transports: [
    new winston.transports.Console({
      format: format.combine(format.colorize()),
      level: "info",
    }),
    new winston.transports.File({ filename: "logs/app.log" }),
  ],
});
const loggerWithNameSpace = function (namespace: string) {
  return logger.child({ namespace });
};
export default loggerWithNameSpace;
