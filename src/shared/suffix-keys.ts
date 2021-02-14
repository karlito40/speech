// TODO: TS | make it works somehow....
type Suffix<T extends string> = `${T}$`;

export default function suffixKeys<T extends object> (o: T, suffix: string) {
  return Object
    .entries(o)
    // replace "any" with the typeof v ..
    // and string with "Suffix" 
    .reduce<Record<string, any>>((acc, [k, v]) => {
      acc[`k${suffix}`] = v
      return acc
    }, {}) as T
}


// vue code found afterward

/**
 * 
export function toRef<T extends object, K extends keyof T>(
  object: T,
  key: K
): ToRef<T[K]> {
  return isRef(object[key])
    ? object[key]
    : (new ObjectRefImpl(object, key) as any)
}
 * 
 */