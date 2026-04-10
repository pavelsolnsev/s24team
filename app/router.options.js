import routerWrapper from '~/layouts/routerWrapper.vue';
import authMiddleware from '~/middleware/auth';

export default {
  // https://router.vuejs.org/api/interfaces/routeroptions.html#routes
  routes: _routes => [
    {
      path: '/',
      component: routerWrapper,
      meta: {},
      children: [
        {
          path: '',
          name: 'index',
          component: () => import('@/pages/index.vue'),
          meta: {
            seo: {
              title: 'Главная',
              crumb: 'Главная',
            },
          },
        },
        {
          path: ':nickname',
          children: [
            {
              path: '',
              name: 'profile-id',
              component: () => import('@/pages/profile-id.vue'),
              meta: {
                seo: {
                  title: '',
                  crumb: '',
                },
              },
            },
            {
              path: ':id',
              name: 'project',
              component: () => import('@/pages/project.vue'),
              meta: {
                seo: {
                  title: '',
                  crumb: '',
                },
              },
            },
          ],
        },
        {
          path: 'add',
          name: 'project-add',
          component: () => import('@/pages/project-add.vue'),
          meta: {
            seo: {
              title: 'Добавление проекта',
              crumb: 'Добавление проекта',
            },
          },
        },
        {
          path: 'articles',
          children: [
            {
              path: '',
              name: 'articles',
              component: () => import('@/pages/articles.vue'),
              meta: {
                seo: {
                  title: 'Статьи',
                  crumb: 'Статьи',
                },
              },
            },
            {
              path: 'add',
              name: 'article-add',
              component: () => import('@/pages/article-add.vue'),
              meta: {
                seo: {
                  title: 'Добавление статьи',
                },
              },
            },
            {
              path: ':id',
              name: 'articles-id',
              component: () => import('@/pages/articles-id.vue'),
              meta: {
                seo: {
                  title: '',
                  crumb: '',
                },
              },
            },
          ],
        },
        {
          path: 'lk',
          meta: {
            middleware: [authMiddleware],
          },
          children: [
            {
              path: '',
              name: 'profile',
              component: () => import('~/pages/lk/profile.vue'),
              meta: {
                middleware: [],
                seo: {
                  title: 'Мой профиль',
                  crumb: 'Мой профиль',
                },
              },
            },
            {
              path: 'collections',
              children: [
                {
                  path: '',
                  name: 'collections',
                  component: () => import('@/pages/lk/collections.vue'),
                  meta: {
                    middleware: [],
                    seo: {
                      title: 'Подборки',
                      crumb: 'Подборки',
                    },
                  },
                },
                {
                  path: ':id',
                  name: 'collections-id',
                  component: () => import('@/pages/lk/collections-id.vue'),
                  meta: {
                    middleware: [],
                    seo: {
                      title: '',
                      crumb: '',
                    },
                  },
                },
              ],
            },
            {
              path: 'notifications',
              children: [
                {
                  path: '',
                  name: 'notifications',
                  component: () => import('@/pages/lk/notifications.vue'),
                  meta: {
                    middleware: [],
                    seo: {
                      title: 'Уведомления',
                      crumb: 'Уведомления',
                    },
                  },
                },
                {
                  path: ':id',
                  name: 'notifications-id',
                  component: () => import('@/pages/lk/notifications-id.vue'),
                  meta: {
                    middleware: [],
                    seo: {
                      title: '',
                      crumb: '',
                    },
                  },
                },
              ],
            },
            {
              path: 'settings',
              name: 'settings',
              component: () => import('@/pages/lk/settings.vue'),
              meta: {
                middleware: [],
                seo: {
                  title: 'Настройки',
                  crumb: 'Настройки',
                },
              },
            },
          ],
        },
        {
          path: 'auth',
          meta: {
            middleware: [authMiddleware],
          },
          children: [
            {
              path: '',
              name: 'login',
              component: () => import('~/pages/auth/login.vue'),
              meta: {
                seo: {
                  title: 'Войти в профиль',
                },
              },
            },
            {
              path: 'registration',
              name: 'registration',
              component: () => import('@/pages/auth/registration.vue'),
              meta: {
                seo: {
                  title: 'Регистрация',
                },
              },
            },
            {
              path: 'password',
              name: 'password',
              component: () => import('@/pages/auth/password.vue'),
              meta: {
                seo: {
                  title: 'Забыли пароль',
                },
              },
            },
          ],
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('@/pages/about.vue'),
          meta: {
            seo: {
              title: 'О демо-версии',
              crumb: 'О демо-версии',
            },
          },
        },
      ],
    },
  ],
};
