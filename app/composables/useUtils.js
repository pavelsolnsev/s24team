import { useAppStore } from '~/store/app.js';

export default function () {
  const { stopScrollingPage } = storeToRefs(useAppStore());

  const toggleStopScrolling = stop => {
    stopScrollingPage.value = stop;
  };

  const cloneDeep = obj => {
    if (!obj) return {};
    const rawObject = toRaw(obj);
    return structuredClone(rawObject);
  };

  const plural = (val, forms) => {
    const cases = [2, 0, 1, 1, 1, 2];
    return forms[val % 100 > 4 && val % 100 < 20 ? 2 : cases[val % 10 < 5 ? val % 10 : 5]];
  };

  const pluralNumber = (val, forms) => val + ' ' + plural(val, forms);

  return { toggleStopScrolling, cloneDeep, plural, pluralNumber };
}
