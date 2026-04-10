import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar, Autoplay, Mousewheel } from 'swiper/modules';

export default function (options = {}) {
  const swiperInstance = shallowRef(null);
  const containerRef = ref(null);
  const scrollbarRef = ref(null);
  const scrollbarEl = computed(() => scrollbarRef.value?.$el || scrollbarRef.value);

  const isFirstVisible = ref(true);
  const isLastVisible = ref(false);

  const updateEdges = s => {
    if (!s) return;
    isFirstVisible.value = s.isBeginning;
    isLastVisible.value = s.isEnd;
  };

  const init = () => {
    if (!containerRef.value) return;

    const modules = [Navigation, Pagination, Mousewheel];
    if (options.autoplay) modules.push(Autoplay);
    if (options.scrollbar) modules.push(Scrollbar);
    if (options.modules) modules.push(...options.modules);

    swiperInstance.value = new Swiper(containerRef.value, {
      ...options,
      modules,
      scrollbar:
        options.scrollbar && scrollbarEl.value
          ? {
              el: scrollbarEl.value,
              draggable: true,
              ...options.scrollbar,
            }
          : false,
      on: {
        ...options.on,
        init: s => {
          updateEdges(s);
          options.on?.init?.(s);
        },
        slideChange: s => {
          updateEdges(s);
          options.on?.slideChange?.(s);
        },
        resize: s => {
          updateEdges(s);
          options.on?.resize?.(s);
        },
      },
    });
  };

  onMounted(() => nextTick(() => init()));
  onBeforeUnmount(() => swiperInstance.value?.destroy());

  return {
    containerRef,
    scrollbarRef,
    swiper: swiperInstance,
    isFirstVisible,
    isLastVisible,
    slideNext: () => swiperInstance.value?.slideNext(),
    slidePrev: () => swiperInstance.value?.slidePrev(),
    slideTo: (index, speed) => swiperInstance.value?.slideTo(index, speed),
  };
}
