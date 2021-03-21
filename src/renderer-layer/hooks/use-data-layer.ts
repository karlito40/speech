import { inject } from "vue";
import { DataLayer } from "../../shared/DataLayer";
import { DATA_LAYER } from "../__di__";

export default function useDataLayer (): DataLayer {
  return inject(DATA_LAYER) as DataLayer
}
