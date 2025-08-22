import { compile, pathToRegexp } from 'path-to-regexp';
import qs, { type IStringifyOptions } from 'qs';

function join(host: string, pathname: string): string {
  const removeStartSlash = pathname.startsWith('/') ? pathname.substring(1, pathname.length) : pathname;

  const removeEndSlash = removeStartSlash.endsWith('/')
    ? removeStartSlash.substring(0, removeStartSlash.length - 1)
    : removeStartSlash;

  return [host, removeEndSlash].join('/');
}

function elementStringify(values?: boolean | string | number | boolean[] | string[] | number[] | null) {
  if (values == null) {
    return values;
  }

  if (Array.isArray(values)) {
    const first = values.at(0);

    if (typeof first === 'string') {
      return values;
    }

    return values.map((v) => `${v}`);
  }

  if (typeof values !== 'string') {
    return `${values}`;
  }

  return values;
}

/**
 * Generates a URL based on the provided host, pathname, parameters, and query string options.
 *
 * @param {string | undefined | null} host - The host of the URL. If undefined or null, the default host 'http://localhost' is used.
 * @param {string} pathname - The pathname of the URL.
 * @param {Record<string, boolean | string | number | boolean[] | string[] | number[]>} params - The parameters to be included in the URL.
 * @param {IStringifyOptions} [option] - The options for stringifying the query string.
 * @return {string} The generated URL.
 */
export function urlna(
  host: string | undefined | null,
  pathname: string,
  params?: Record<string, boolean | string | number | boolean[] | string[] | number[] | undefined | null>,
  option?: IStringifyOptions,
): string {
  // step 01. base url build
  const emptyHost = host == null || host === '';
  const baseUrl = join(emptyHost ? 'http://localhost' : host, pathname);
  const url = new URL(baseUrl);

  // step 02. path parameter evaluation using path-to-regexp
  const { keys: pathKeys } = pathToRegexp(url.pathname);

  const keys = pathKeys.map((pathKey) => pathKey.name);
  const builder = compile(url.pathname, {});
  const pathParams = (Object.keys(params ?? {}) as (keyof typeof params)[]).reduce<Record<string, string | string[]>>(
    (aggregated, key) => {
      const value = elementStringify(params?.[key]);
      return { ...aggregated, [key]: value };
    },
    { ...params } as Record<string, string | string[]>,
  );

  const evaluatedUrl = builder(pathParams);
  url.pathname = evaluatedUrl;

  // step 03. query string build
  const queryObject =
    params != null
      ? Object.entries(params)
          .filter(([key]) => !keys.includes(key))
          .reduce<Record<string, unknown>>((aggregation, [key, value]) => ({ ...aggregation, [key]: value }), {})
      : {};

  const queryStringStringified = qs.stringify(queryObject, option);

  if (queryStringStringified !== '') {
    return `${emptyHost ? url.pathname : url.href}?${queryStringStringified}`;
  }

  return emptyHost ? url.pathname : url.href;
}
