/**
 * @private
 */
export function flatten(
  object: { [key: string]: any },
  separator = '.'
): { [key: string]: any } {
  const isValidObject = (value: {}): boolean => {
    if (!value) {
      return false;
    }

    const isArray = Array.isArray(value);
    const isBuffer = Buffer.isBuffer(value);
    const isΟbject =
      Object.prototype.toString.call(value) === '[object Object]';
    const hasKeys = !!Object.keys(value).length;

    return !isArray && !isBuffer && isΟbject && hasKeys;
  };

  const walker = (
    child: { [key: string]: any },
    path: Array<string> = []
  ): Object => {
    return Object.assign(
      {},
      ...Object.keys(child).map((key) =>
        isValidObject(child[key])
          ? walker(child[key], path.concat([key]))
          : { [path.concat([key]).join(separator)]: child[key] as unknown }
      )
    ) as Object;
  };

  return { ...walker(object) };
}

/**
 * @private
 */
export function mergeRoles(
  dst: { [key: string]: any },
  ...srcs: Array<{ [key: string]: any }>
): { [key: string]: any } {
  for (const src of srcs) {
    for (const [key, val] of Object.entries(src)) {
      if (typeof val === 'object') {
        dst[key] = { ...dst[key], ...val } as Object;
      } else {
        dst[key] = val as unknown;
      }
    }
  }

  return dst;
}
