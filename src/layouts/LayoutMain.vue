<template>
  <main>
    <n-layout style="max-width: 1200px">
      <n-layout-header>
        <main-header />
      </n-layout-header>

      <n-layout has-sider>
        <n-layout-sider
          content-style="padding: unset; display:flex;align-items:center;padding-inline:24px;"
        >
          <catalog-main-drawer />
        </n-layout-sider>
        <n-layout-content
          content-style="padding: unset; display:flex;align-items:center;"
        >
          <n-input
            clearable
            placeholder="Поиск"
          >
            <template #suffix>
              <n-icon :component="Search16Regular" />
            </template>
          </n-input>
        </n-layout-content>
        <n-layout-sider content-style="padding: 24px;">
          <div style="display: flex; justify-content: space-between">
            <n-dropdown
              trigger="click"
              :options="options"
              size="large"
            >
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                "
              >
                <n-button
                  text
                  style="font-size: 24px"
                >
                  <n-icon>
                    <person />
                  </n-icon>
                </n-button>
                <span>Кабинет</span>
              </div>
            </n-dropdown>

            <div
              style="display: flex; flex-direction: column; align-items: center"
            >
              <n-button
                text
                style="font-size: 24px"
              >
                <n-icon>
                  <heart />
                </n-icon>
              </n-button>
              <span>Избранное</span>
            </div>

            <div
              style="display: flex; flex-direction: column; align-items: center"
            >
              <n-badge
                :value="cartCount"
                :max="9"
                color="#18a058"
                :offset="[5, 0]"
              >
                <n-button
                  text
                  style="font-size: 24px"
                  @click="openCart()"
                >
                  <n-icon>
                    <cart />
                  </n-icon>
                </n-button>
              </n-badge>
              <span>Корзина</span>
            </div>
          </div>
        </n-layout-sider>
      </n-layout>
      <!--     <n-layout-footer content-style="padding: 32px;">
      
    </n-layout-footer> -->

      <slot />
    </n-layout>
    <update-user-info-modal v-model:show="updateInfoModal" />
  </main>
</template>

<script lang="ts" setup>
import { MainHeader } from '@/components';
import { LayoutDefault } from '@/layouts';
import type { DrawerPlacement } from 'naive-ui';
import { computed, ComputedRef, reactive, ref, ShallowRef } from 'vue';
import {
  NSpace,
  NLayout,
  NLayoutContent,
  NGrid,
  NGi,
  NLayoutHeader,
  NLayoutFooter,
  NLayoutSider,
  NButton,
  NInput,
  NIcon,
  NDrawer,
  NDrawerContent,
  NMessageProvider,
  NMenu,
  NScrollbar,
  NBadge,
  NDropdown,
  NAvatar,
  NText,
  NIconWrapper,
} from 'naive-ui';
import {
  Search16Regular,
  Person20Filled as Person,
  Heart20Filled as Heart,
  Cart20Filled as cart,
  TextAlignLeft16Filled as Align,
} from '@vicons/fluent';
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon,
  HomeOutline as HomeIcon,
  CartOutline as Cart,
  BuildOutline as Build,
  SettingsOutline as Settings,
  PowerOutline as Power,
} from '@vicons/ionicons5';
import { defineComponent, h, Component } from 'vue';
import {
  CatalogMainDrawer,
  MainBanner,
  ProductMainTab,
  UpdateUserInfoModal,
} from '@/components';
import type { MenuOption } from 'naive-ui';
import { useRouter } from 'vue-router';
import { ROUTES_NAME } from '@/router';
import { useCartStore, useUserStore } from '@/store';
import { useAppState, GetUserRoleInString } from '@/helpers';
import { UserRoleEnum } from '@/@enums';

const router = useRouter();
const cartStore = useCartStore();
const userStore = useUserStore();

const cartCount: ComputedRef<number> = computed(() => cartStore.data.length);
const currentUserName: ComputedRef<string> = computed(
  () => userStore.current?.name ?? 'Ошибка отображения'
);
const currentUserRole: ComputedRef<UserRoleEnum> = computed(
  () => userStore.current?.roleId ?? 0
);

const openCart = async () => {
  await router.push({ name: ROUTES_NAME.CART });
};

const openOrders = async () => {
  await router.push({ name: ROUTES_NAME.ORDERS });
};

const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    });
  };
};

const renderCustomHeader = () => {
  return h(
    'div',
    {
      style: 'display: flex; align-items: center; padding: 8px 12px;',
    },
    [
      h(
        NIconWrapper,
        { size: 50, 'border-radius': 12, style: 'margin-right: 12px;' },
        [
          h(NIcon, {
            size: 46,
            component: Person,
          }),
        ]
      ),

      h('div', null, [
        h('div', null, [
          h(NText, { depth: 2 }, { default: () => currentUserName.value }),
        ]),
        h('div', { style: 'font-size: 12px;' }, [
          h(
            NText,
            { depth: 3 },
            { default: () => GetUserRoleInString(currentUserRole.value) }
          ),
        ]),
      ]),
    ]
  );
};

const options = reactive([
  {
    key: 'header',
    type: 'render',
    render: renderCustomHeader,
  },
  {
    label: 'Мои заказы',
    key: 'orders',
    icon: renderIcon(Cart),
    props: {
      onClick: async () => {
        await openOrders();
      },
    },
  },
  {
    label: 'Мои конфигурации',
    key: 'configs',
    icon: renderIcon(Build),
  },
  {
    label: 'Редактирование профиля',
    key: 'profile',
    icon: renderIcon(Settings),
    props: {
      onClick: async () => {
        updateUserInfo();
      },
    },
  },
  {
    label: 'Выход',
    key: 'logout',
    icon: renderIcon(Power),
    props: {
      onClick: async () => {
        const appState = useAppState();
        await appState.logOut(router);
      },
    },
  },
]);

const updateInfoModal = ref<boolean>(false);

const updateUserInfo = () => {
  updateInfoModal.value = true;
};
</script>

<style scoped>
main {
  display: flex;
  justify-content: center;
}
.n-layout-header,
.n-layout-footer {
  /* background: rgba(128, 128, 128, 0.2); */
  padding: 24px;
}

/* .n-layout-sider {
  background: rgba(128, 128, 128, 0.3);
}

.n-layout-content {
  background: rgba(128, 128, 128, 0.4);
} */
</style>
