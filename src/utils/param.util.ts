import { WeatherRequest } from "../interfaces/weather";

interface Param {
  name: string;
  value: any;
}

interface ParamUtil {
  checkParamWeather: (req: WeatherRequest) => Param[];
}

const param = (): ParamUtil => {
  const checkParamWeather = (req: WeatherRequest): Param[] => {
    const params: Param[] = [];

    if (req.lat && req.lon) {
      params.push({ name: "lat", value: req.lat });
      params.push({ name: "lon", value: req.lon });
    } else if (req.q) {
      params.push({ name: "q", value: req.q });
    } else if (req.id) {
      params.push({ name: "id", value: req.id });
    } else if (req.zip) {
      params.push({ name: "zip", value: req.zip });
    }

    return params;
  };

  return { checkParamWeather };
};

export const paramUtil = param();
