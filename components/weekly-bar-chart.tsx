import { Fragment, useState } from "react";
import { type LayoutChangeEvent, View } from "react-native";
import Svg, { Line, Rect, Text as SvgText } from "react-native-svg";

export type WeeklyBarChartDatum = { label: string; value: number };

type WeeklyBarChartProps = {
  data: WeeklyBarChartDatum[];
  accentColor: string;
  baseColor: string;
};

const PLOT_HEIGHT = 130;
const TOOLTIP_SPACE = 34;
const LABEL_SPACE = 24;
const LEFT_AXIS_WIDTH = 26;
const BAR_RADIUS = 8;

function niceMax(value: number) {
  const step = 15;
  return Math.max(step, Math.ceil(value / step) * step);
}

export function WeeklyBarChart({ data, accentColor, baseColor }: WeeklyBarChartProps) {
  const [width, setWidth] = useState(0);

  const onLayout = (event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width);
  };

  const maxValue = Math.max(...data.map((datum) => datum.value), 0);
  const max = niceMax(maxValue);
  const ticks = [0, max / 3, (max * 2) / 3, max];

  const highlightIndex = data.reduce(
    (best, datum, index) => (datum.value > data[best].value ? index : best),
    0,
  );

  const totalHeight = TOOLTIP_SPACE + PLOT_HEIGHT + LABEL_SPACE;
  const plotWidth = Math.max(width - LEFT_AXIS_WIDTH, 0);
  const slotWidth = plotWidth / Math.max(data.length, 1);
  const barWidth = Math.min(28, slotWidth * 0.5);

  return (
    <View onLayout={onLayout} style={{ width: "100%" }}>
      {width > 0 ? (
        <Svg width={width} height={totalHeight}>
          {ticks.map((tick, index) => {
            const y = TOOLTIP_SPACE + PLOT_HEIGHT - (tick / max) * PLOT_HEIGHT;
            return (
              <Fragment key={`tick-${index}`}>
                <Line
                  x1={LEFT_AXIS_WIDTH}
                  x2={width}
                  y1={y}
                  y2={y}
                  stroke="rgba(8,17,38,0.12)"
                  strokeWidth={1}
                  strokeDasharray="4,4"
                />
                <SvgText
                  x={0}
                  y={y + 4}
                  fontSize={11}
                  fontFamily="sans-medium"
                  fill="rgba(8,17,38,0.4)"
                >
                  {Math.round(tick)}
                </SvgText>
              </Fragment>
            );
          })}

          {data.map((datum, index) => {
            const x = LEFT_AXIS_WIDTH + index * slotWidth + (slotWidth - barWidth) / 2;
            const barHeight = Math.max(max > 0 ? (datum.value / max) * PLOT_HEIGHT : 0, 3);
            const y = TOOLTIP_SPACE + PLOT_HEIGHT - barHeight;
            const isHighlight = index === highlightIndex && datum.value > 0;
            const cornerRadius = Math.min(BAR_RADIUS, barWidth / 2, barHeight / 2);

            return (
              <Fragment key={`${datum.label}-${index}`}>
                {isHighlight ? (
                  <>
                    <Rect
                      x={x + barWidth / 2 - 22}
                      y={y - 28}
                      width={44}
                      height={22}
                      rx={11}
                      fill={accentColor}
                    />
                    <SvgText
                      x={x + barWidth / 2}
                      y={y - 12}
                      fontSize={12}
                      fontFamily="sans-bold"
                      fill="#ffffff"
                      textAnchor="middle"
                    >
                      {`$${Math.round(datum.value)}`}
                    </SvgText>
                  </>
                ) : null}
                <Rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  rx={cornerRadius}
                  fill={isHighlight ? accentColor : baseColor}
                />
                <SvgText
                  x={x + barWidth / 2}
                  y={TOOLTIP_SPACE + PLOT_HEIGHT + 18}
                  fontSize={12}
                  fontFamily="sans-semibold"
                  fill="rgba(8,17,38,0.55)"
                  textAnchor="middle"
                >
                  {datum.label}
                </SvgText>
              </Fragment>
            );
          })}
        </Svg>
      ) : null}
    </View>
  );
}
