import { defineComponent, h, PropType } from "vue";
import * as icons from '../assets/heroicons';

export type IconName = keyof typeof icons;

export default defineComponent({
  props: {
    name: {
      type: String as PropType<IconName>,
      required: true
    }
  },

  render () {
    return h(icons[this.name], {
      ...this.$attrs,
      class: `Icon ${this.$attrs.class}` 
    });
  }
})