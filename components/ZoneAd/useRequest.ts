import axios, { AxiosResponse } from "axios";
import { useAsync } from "react-use";
import { AsyncState } from "react-use/lib/useAsyncFn";

import { API_URL } from "../../helpers/constants";

export type AdSlug =
  | "carros-y-camionetas"
  | "camiones"
  | "colección"
  | "motos"
  | "otros";

export interface Response {
  status: boolean;
  patterns: AD;
}

export interface AD {
  id: number;
  name: string;
  image: string;
  image_mobile: string;
  link: string;
  button_name: string;
  active: number;
  clicks: number;
  slug: string;
}

const SlugReplace = {
  GET: "[SLUG]",
  PUT: "[id-pattner]",
};
const URL_GET = `${API_URL}/pattners/${SlugReplace.GET}`;
const URL_PUT = `${API_URL}/click-pattner/${SlugReplace.PUT}`;

export const reportClick = (id) => {
  axios.put(URL_PUT.replace(SlugReplace.PUT, id)).catch(console.warn);
};

export const useRequestInfo = (slug: AdSlug) => {
  const state = useAsync(async () => {
    if (!slug) return {} as AxiosResponse<Response>;
    const result = await axios.get<Response>(
      URL_GET.replace(SlugReplace.GET, slug)
    );
    return result;
  }, [slug]);
  return { ...state };
};
