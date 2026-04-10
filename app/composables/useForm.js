export default function (form) {
  const itemRefs = ref({});

  // Синхронизация matchValue для полей, которые объявляют matchName
  watchEffect(() => {
    form.value.forEach(item => {
      if (!item.matchName) return;
      const source = form.value.find(f => f.name === item.matchName);
      if (source) item.matchValue = source.value;
    });
  });

  // Ревалидация полей с matchName при изменении источника поля, на которое ссылается matchName
  form.value
    .filter(item => item.matchName)
    .forEach(item => {
      const source = computed(() => form.value.find(f => f.name === item.matchName)?.value);
      watch(source, () => {
        if (item.error) itemRefs.value[item.name]?.validate();
      });
    });

  const getFieldProps = item => {
    const { error, value, component, api, matchName, ...rest } = item;

    return {
      ...rest,
      ref: el => {
        if (el) itemRefs.value[item.name] = el;
        else delete itemRefs.value[item.name];
      },
    };
  };

  const validateAll = async () => {
    const visibleFields = form.value.filter(item => !item.hidden);

    const validationPromises = visibleFields.map(async item => {
      const componentRef = itemRefs.value[item.name];

      if (componentRef && typeof componentRef.validate === 'function') {
        return await componentRef.validate();
      }
      return '';
    });

    const errors = await Promise.all(validationPromises);
    return errors.every(msg => !msg);
  };

  const setDataInForm = objData => {
    form.value.forEach(i => {
      if (Object.keys(objData).includes(i.api)) i.value = objData[i.api];
    });
  };

  const getFormData = async () => {
    const result = await validateAll();
    if (!result) return;
    const formData = new FormData();
    form.value
      .filter(i => i.api)
      .forEach(i => {
        if (Array.isArray(i.value) && i.value?.length === 1 && i.value[0] instanceof File) {
          formData.append(i.api, i.value[0]);
        } else {
          formData.append(i.api, i.value);
        }
      });
    return formData;
  };

  const getData = async () => {
    const result = await validateAll();
    if (!result) return;
    return form.value
      .filter(i => i.api)
      .reduce((acc, i) => {
        acc[i.api] = i.value;
        return acc;
      }, {});
  };

  const reset = incomingForm => {
    const resForm = incomingForm || form;
    resForm.value.forEach(i => (!i.readonly ? (i.value = '') : i.value));
  };

  return {
    setDataInForm,
    getFormData,
    getData,
    reset,
    itemRefs,
    getFieldProps,
    validateAll,
  };
}
