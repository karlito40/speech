import { ToRefs, toRefs } from "vue";
import suffixKeys from "./suffix-keys";

export default function toSuffixRefs<T extends object> (o: T, suffix: string): ToRefs<T> {
  return suffixKeys(toRefs(o), '$')
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