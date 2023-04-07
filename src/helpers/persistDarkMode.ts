import { Preferences } from "@capacitor/preferences";
export const setName = async (keyName: string, keyValue: string) => {
  await Preferences.set({
    key: keyName,
    value: keyValue,
  });
};

export const checkName = async (
  getKeyName: string,
  getKeyCallBack: Function
) => {
  const { value } = await Preferences.get({ key: getKeyName });
  getKeyCallBack(value);
};
