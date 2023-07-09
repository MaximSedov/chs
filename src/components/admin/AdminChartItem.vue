<template>
  <n-card
    :title="chartData.title"
    :segmented="{
      content: true,
      footer: 'soft',
    }"
    header-style="padding:12px"
    content-style="padding:unset;padding-inline:6px;"
    footer-style="padding:12px"
    style="height: auto"
  >
    <template #header-extra />

    <div
      id="chart"
      class=""
    >
      <!-- <Bar id="my-chart-id" :options="chartOptions" :data="chartData" /> -->
      <Line
        :data="chartData"
        :options="options"
      />
    </div>
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
import { Line } from 'vue-chartjs';
const props = defineProps({
  chartData: {
    type: Object as PropType<any>,
    required: true,
  },
});

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
};
</script>
<style scoped></style>
