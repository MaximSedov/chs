<template>
  <n-layout>
    <n-layout-content content-style="padding: 12px;padding-inline:24px;">
      <n-h2>Статистика</n-h2>
      <n-grid
        x-gap="12"
        y-gap="12"
        :cols="4"
      >
        <n-gi
          v-for="item in widgets"
          :key="item"
        >
          <admin-statistic-widget
            :widget-type="item"
            @onClick="updateTab"
          />
        </n-gi>
      </n-grid>

      <n-card
        :segmented="{
          content: true,
          footer: 'soft',
        }"
        footer-style="padding:unset; padding-top: 12px; padding-bottom: 12px;"
        style="height: 100%; margin-top: 12px"
      >
        <n-tabs
          v-model:value="activeTab"
          type="line"
          animated
        >
          <n-tab-pane
            v-for="item in widgets"
            :key="item"
            :name="item"
            :tab="item"
          >
            <admin-chart-hub :widget-type="activeTab" />
          </n-tab-pane>
        </n-tabs>
      </n-card>

      <!-- <div id="chart" class="">
        <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
      </div> -->
    </n-layout-content>
  </n-layout>
  <n-back-top
    :right="40"
    :visibility-height="500"
  />
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
  NBackTop,
} from 'naive-ui';

import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { reactive, ref } from 'vue';
import { ReloadOutline, EyeOutline } from '@vicons/ionicons5';
import { StatisticsWidgetEnum } from '@/@enums';
import { StatisticsWidgetModel } from '@/@types';
import {
  AdminStatisticWidget,
  AdminChartItem,
  AdminChartHub,
} from '@/components';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const chartData = {
  labels: ['January', 'February', 'March'],
  datasets: [{ data: [40, 20, 12] }],
};

const chartOptions = {
  responsive: true,
};

const activeTab = ref<StatisticsWidgetEnum>(StatisticsWidgetEnum.Users);

const updateTab = (tab: StatisticsWidgetEnum) => {
  activeTab.value = tab;
};

const widgets = [
  StatisticsWidgetEnum.Users,
  StatisticsWidgetEnum.Products,
  StatisticsWidgetEnum.Orders,
  StatisticsWidgetEnum.Stocks,
] as StatisticsWidgetEnum[];
</script>
<style scoped></style>
