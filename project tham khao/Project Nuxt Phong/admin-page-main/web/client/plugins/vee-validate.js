import Vue from "vue";
import {
  extend,
  localize,
  ValidationObserver,
  ValidationProvider,
} from "vee-validate";
import en from "vee-validate/dist/locale/en.json";
import vi from "vee-validate/dist/locale/vi.json";
import validatorEn from "../locales/validate/usValidate.json";
import validatorVn from "../locales/validate/vnValidate.json";
import * as rules from "vee-validate/dist/rules";
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});
localize({
  us: {
    messages: {
      ...en.messages,
    },
    names: { ...validatorEn.names },
  },
  vn: {
    messages: {
      ...vi.messages,
    },
    names: { ...validatorVn.names },
  },
});
localize('vn')
Vue.component("validation-provider", ValidationProvider);
Vue.component("validation-observer", ValidationObserver);
