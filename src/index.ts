import { compile, Key, pathToRegexp } from 'path-to-regexp';
import qs, { IStringifyOptions } from 'qs';

function join(host: string, pathname: string): string {
  const removeStartSlash = pathname.startsWith('/')
    ? pathname.substring(1, pathname.length)
    : pathname;

  const removeEndSlash = removeStartSlash.endsWith('/')
    ? removeStartSlash.substring(0, removeStartSlash.length - 1)
    : removeStartSlash;

  return [host, removeEndSlash].join('/');
}

export function urlna(
  host: string | undefined | null,
  pathname: string,
  params: Record<string, boolean | string | number | boolean[] | string[] | number[]>,
  option?: IStringifyOptions,
) {
  // step 01. base url build
  const emptyHost = host === undefined || host === null || host === '';
  const baseUrl = join(emptyHost ? 'http://localhost' : host, pathname);
  const url = new URL(baseUrl);

  // step 02. path parameter evaluation using path-to-regexp
  const pathKeys: Key[] = [];

  pathToRegexp(url.pathname, pathKeys);

  const keys = pathKeys.map((pathKey) => pathKey.name);
  const builder = compile(url.pathname, {});

  const evaluatedUrl = builder(params);
  url.pathname = evaluatedUrl;

  // step 03. query string build
  const queryObject = Object.entries(params)
    .filter(([key]) => !keys.includes(key))
    .reduce((aggregation, [key, value]) => {
      return { ...aggregation, [key]: value };
    }, {});

  const queryStringStringified = qs.stringify(queryObject, option);

  if (queryStringStringified !== '') {
    return `${emptyHost ? url.pathname : url.href}?${queryStringStringified}`;
  }

  return `${emptyHost ? url.pathname : url.href}`;
}
