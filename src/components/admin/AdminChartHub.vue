<template>
  <n-grid
    x-gap="12"
    y-gap="12"
    :cols="3"
  >
    <n-gi
      v-for="item in chartData"
      :key="item"
    >
      <admin-chart-item :chart-data="item" />
    </n-gi>
  </n-grid>
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
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { computed, ComputedRef, PropType, reactive } from 'vue';
import { ReloadOutline, EyeOutline } from '@vicons/ionicons5';
import { StatisticsWidgetEnum } from '@/@enums';
import { StatisticsWidgetModel } from '@/@types';
import { AdminChartItem } from '@/components';
import { Line } from 'vue-chartjs';
import { format, startOfToday, subDays } from 'date-fns';
const props = defineProps({
  widgetType: {
    type: String as PropType<StatisticsWidgetEnum>,
    required: true,
  },
});

const chartData: ComputedRef<any> = computed(() => {
  switch (props.widgetType) {
    case StatisticsWidgetEnum.Users:
      return [
        {
          title: 'Регистрации',
          labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май'],
          datasets: [
            {
              borderDash: [5, 5],
              backgroundColor: '#18a058',
              label: 'Кол-во пользователей',

              data: [40, 89, 60, 70, 2],
            },
          ],
        },
        {
          title: 'Авторизации',
          labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май'],
          datasets: [
            {
              borderDash: [5, 5],
              backgroundColor: '#18a058',
              label: 'Кол-во пользователей',

              data: [400, 890, 600, 700, 200],
            },
          ],
        },
        {
          title: 'Среднесуточный онлайн',
          labels: days.value,
          datasets: [
            {
              borderDash: [5, 5],
              backgroundColor: '#18a058',
              label: 'Кол-во пользователей',

              data: [400, 890, 600, 700, 300, 450],
            },
          ],
        },
      ];
  }
});

const days: ComputedRef<any> = computed(() => {
  const datesArray = [];
  for (let i = 5; i >= 0; i--) {
    const date = subDays(new Date(), i);
    const formattedDate = format(date, 'dd.MM');
    datesArray.push(formattedDate);
  }
  return datesArray;
});
</script>
<style scoped></style>
