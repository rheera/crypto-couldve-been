import { isProxy, Ref, toRaw } from "vue";
import { toReactive } from "VueUse";

export function validateEmail(email) {
  return email.match(
    /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  );
}

export function validatePositiveNumber(number) {
  return number.match(/^(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/);
}

export const deRef = <T>(ref: Ref<T>): T => {
  return (ref as any)._rawValue;
};
export function validate(that, ev) {
  //   const target_copy = Object.assign({}, that);

  //   console.log(that);
  //   console.log(target_copy);

  const value = ev.target.value;

  that.$el.classList.remove("ion-valid");
  that.$el.classList.remove("ion-invalid");

  if (value === "") return;

  if (that.type === "email") {
    validateEmail(value)
      ? that.$el.classList.add("ion-valid")
      : that.$el.classList.add("ion-invalid");
  } else if (that.type === "number") {
    validatePositiveNumber(value)
      ? that.$el.classList.add("ion-valid")
      : that.$el.classList.add("ion-invalid");
  }
}

export function markTouched(that) {
  that.$el.classList.add("ion-touched");
}

export function validSellingDate(
  buyingDate,
  sellingDate,
  buyingInput,
  sellingInput
) {
  if (new Date(buyingDate) < new Date(sellingDate)) {
    buyingInput.$el.classList.remove("ion-invalid");
    sellingInput.$el.classList.remove("ion-invalid");

    buyingInput.$el.classList.add("ion-valid");
    sellingInput.$el.classList.add("ion-valid");
  } else {
    buyingInput.$el.classList.remove("ion-valid");
    sellingInput.$el.classList.remove("ion-valid");
    buyingInput.$el.classList.add("ion-invalid");
    sellingInput.$el.classList.add("ion-invalid");
  }
  return new Date(buyingDate) < new Date(sellingDate);
}
