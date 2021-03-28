import { inject } from "vue";
import { LogicLayer } from "../../logic-layer/types";
import { LOGIC_LAYER } from "../__di__";

export default function useLogicLayer (): LogicLayer {
  return inject(LOGIC_LAYER) as LogicLayer
}
