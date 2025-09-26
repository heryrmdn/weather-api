import winston from "winston";

const logger = () => {
  const fileFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.uncolorize(),
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.prettyPrint({
      depth: 5,
    }),
    winston.format.printf((info: winston.Logform.TransformableInfo) => `${info.level}: ${info.timestamp} ${info.message}`)
  );

  const consoleFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.prettyPrint({
      depth: 5,
    }),
    winston.format.printf((info: winston.Logform.TransformableInfo) => `${info.level}: ${info.timestamp} ${info.message}`)
  );

  const consoleTransport = new winston.transports.Console({
    format: consoleFormat,
  });

  const logger = winston.createLogger({
    levels: winston.config.syslog.levels,
    transports: [consoleTransport],
  });

  return {
    logger,
  };
};

export const loggerUtil = logger();
