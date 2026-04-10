export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {
      // id: '123458',
      id: null,
      is_completed: true, // Заполнен ли профиль
      // is_completed: false,

      name: 'petrov2006',
      avatar: '/mocks/avatars/1.webp',
      role: 'expert',
      fullName: 'Константин Петров',
      directions: ['Дизайн', 'Фотография', 'Реклама'],
      categories: [
        'UX/UI',
        'UX/UI',
        'UX/UI',
        'UX/UI',
        'Упаковка',
        'Постеры',
        'Брендинг',
        'Графический дизайн',
      ],
      about:
        'Это портфолио — моя творческая лаборатория и хроника роста. Здесь живут вместе ключевые учебные кейсы, где я оттачивал(а) мастерство, смелые личные эксперименты, проверяющие границы жанров, и первые коммерческие проекты, которые научили меня диалогу с реальным заказчиком.',
      countExpertRatings: 4,
      countRatedProjects: 123,
      countProjects: 56,
      likes: 251,
      countArticles: 99,
    },
  }),
  getters: {
    isAuth: state => !!state.user?.id,
    permissions: () => ({
      admin: ['all'],
      creator: ['create_project'],
      expert: ['create_project', 'create_article'],
    }),
    can: state => permission => {
      const userPermissions = state.permissions[state.user?.role] || [];
      return userPermissions.includes('all') || userPermissions.includes(permission);
    },
  },
  actions: {},
});
