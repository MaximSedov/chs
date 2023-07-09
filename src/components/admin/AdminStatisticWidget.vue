<template>
  <n-card
    hoverable
    :title="widgetData.title"
    :segmented="{
      content: true,
      footer: 'soft',
    }"
    footer-style="padding:unset; padding-top: 12px; padding-bottom: 12px;"
    style="height: 100%"
    @click="itemClick()"
  >
    <template #header-extra>
      <n-button
        strong
        secondary
        :type="widgetData.headerButton.color"
        style="margin-right: 6px"
        @click="itemClick()"
      >
        {{ widgetData.headerButton.title }}
      </n-button>
      <n-button
        strong
        secondary
        :type="widgetData.headerButton.color"
      >
        <template #icon>
          <n-icon><reload-outline /></n-icon>
          <!-- <n-spin size="small" stroke="rgb(250 250 252)"/> -->
        </template>
      </n-button>
    </template>
    <n-scrollbar
      style="max-height: 190px"
      trigger="hover"
    >
      <n-timeline
        v-if="widgetData.shortData"
        size="large"
      >
        <n-timeline-item
          v-for="data in widgetData.shortData"
          :key="data.title"
          :type="data.type"
          :content="data.title"
        >
          <n-statistic :label="data.title">
            <n-number-animation
              v-if="widgetData.type !== StatisticsWidgetEnum.Stocks"
              active
              :from="0"
              :to="data.content"
              :precision="0"
            />
            <template v-else>
              {{ data.content }}
            </template>
          </n-statistic>
        </n-timeline-item>
      </n-timeline>
    </n-scrollbar>

    <template #footer>
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <div class="">
          {{ widgetData.footerData.title }}
        </div>
        <n-statistic>
          <n-number-animation
            active
            :from="0"
            :to="widgetData.footerData.content"
            :precision="0"
          />
        </n-statistic>
      </div>
    </template>
  </n-card>
</template>
<script setup lang="ts">
import {
  NSpace,
  NLayout,
  NLayoutContent,
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
  NGrid,
  NGi,
  NRow,
  NCol,
  NH2,
  NH5,
  NH3,
  NList,
  NThing,
  NListItem,
  NResult,
  NCard,
  NTab,
  NTabPane,
  NTabs,
  NText,
  NCarousel,
  NImage,
  NBadge,
  NTime,
  NTimeline,
  NTimelineItem,
  NStatistic,
  NSpin,
  NScrollbar,
  NNumberAnimation,
} from 'naive-ui';

import { computed, ComputedRef, PropType, reactive } from 'vue';
import { ReloadOutline, EyeOutline } from '@vicons/ionicons5';
import { StatisticsWidgetEnum } from '@/@enums';
import { StatisticsWidgetModel } from '@/@types';

const props = defineProps({
  widgetType: {
    type: String as PropType<StatisticsWidgetEnum>,
    required: true,
  },
});

const widgetData: ComputedRef<StatisticsWidgetModel> = computed(() => {
  switch (props.widgetType) {
    case StatisticsWidgetEnum.Users:
      return {
        type: StatisticsWidgetEnum.Users,
        title: 'Пользователи',
        headerButton: { title: 'Подробнее', color: 'success' },
        shortData: [
          { title: 'Клиенты', content: 123, type: 'success' },
          { title: 'Администраторы', content: 5, type: 'success' },
          { title: 'Менеджеры', content: 15, type: 'success' },
        ],
        footerData: { title: 'Всего пользователей:', content: 342 },
      };

    case StatisticsWidgetEnum.Products:
      return {
        type: StatisticsWidgetEnum.Products,
        title: 'Товары',
        headerButton: { title: 'Подробнее', color: 'info' },
        shortData: [
          { title: 'Комплектующие для ПК', content: 3235, type: 'info' },
          { title: 'Компьютеры и ноутбуки', content: 311, type: 'info' },
          { title: 'Сетевое оборудование', content: 1579, type: 'info' },
        ],
        footerData: { title: 'Всего товаров:', content: 4242 },
      };

    case StatisticsWidgetEnum.Orders:
      return {
        type: StatisticsWidgetEnum.Orders,
        title: 'Заказы',
        headerButton: { title: 'Подробнее', color: 'warning' },
        shortData: [
          { title: 'Ожидают подтверждения', content: 5245, type: 'warning' },
          { title: 'Подтверждены', content: 43534, type: 'warning' },
          { title: 'Доставлены', content: 75565, type: 'warning' },
        ],
        footerData: { title: 'Всего пользователей', content: 342 },
      };

    case StatisticsWidgetEnum.Stocks:
      return {
        type: StatisticsWidgetEnum.Stocks,
        title: 'Склады',
        headerButton: { title: 'Подробнее', color: 'error' },
        shortData: [
          {
            title: 'Основной склад',
            content: 'Рязанская улица, 1',
            type: 'error',
          },
          {
            title: 'Вспомогательный склад 1',
            content: 'Главная наб., 26',
            type: 'error',
          },
          {
            title: 'Вспомогательный склад 2',
            content: 'Центр. пер., 61',
            type: 'error',
          },
        ],
        footerData: { title: 'Всего складов:', content: 3 },
      };
  }
});

const emit = defineEmits(['onClick']);

const itemClick = () => {
  emit('onClick', props.widgetType);
};
</script>
<style scoped></style>
