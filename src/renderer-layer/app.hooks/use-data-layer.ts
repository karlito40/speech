import { inject } from "vue";
import { DataLayer } from "../../shared/DataLayer";
import { DATA_LAYER } from "../__di__";

export default function (targetedService: keyof DataLayer) {
  const dataLayer = inject(DATA_LAYER) as DataLayer
  return dataLayer[targetedService]
}