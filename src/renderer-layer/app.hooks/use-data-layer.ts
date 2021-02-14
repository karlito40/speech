import { inject } from "vue";
import { DataLayer, RoomService } from "../../shared/DataLayer";
import { DATA_LAYER } from "../__di__";

// TODO: TS | Fine a way to type that things
export default function useDataLayer (targetedService: keyof DataLayer) {
  const dataLayer = inject(DATA_LAYER) as DataLayer
  return targetedService ? dataLayer[targetedService] : dataLayer
}

// just because typescript is not able to understand dataLayer[targetedService] ...
// export function useRoomService (): RoomService {
//   return useDataLayer('room') as RoomService
// }