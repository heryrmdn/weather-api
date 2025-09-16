import { WeatherRequest } from "../interfaces/weather";

interface Param {
  name: string;
  value: any;
}

interface ParamUtil {
  checkParamWeather: (req: WeatherRequest) => Param[];
  setParamWeather: (params: Param[]) => URLSearchParams;
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

    if (req.cnt) {
      params.push({ name: "cnt", value: req.cnt });
    } else if (req.limit) {
      params.push({ name: "limit", value: req.limit });
    }

    console.log("params: ", params);

    return params;
  };

  const setParamWeather = (params: Param[]): URLSearchParams => {
    const searchParams = new URLSearchParams();

    params.forEach((item) => {
      searchParams.append(item.name, item.value);
    });
    return searchParams;
  };

  return { checkParamWeather, setParamWeather };
};

export const paramUtil = param();
