import mg from "morgan";
import { loggerUtil } from "../utils/logger.util";

export interface Morgan {
  morgan: any;
}

export interface MorganMiddleware {
  load: () => Morgan;
}

export const morganMiddleware = () => {
  const load = () => {
    const morgan = mg("dev", {
      stream: {
        write: (message) => {
          loggerUtil.logger.info(message);
        },
      },
    });

    return {
      morgan,
    };
  };

  return {
    load,
  };
};
