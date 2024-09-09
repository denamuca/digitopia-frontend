// app/components/GanttChart.tsx
import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

interface GanttChartProps {
  data: any[];
}

const GanttChart: React.FC<GanttChartProps> = ({ data }) => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (data.length === 0) return;

    d3.select(ref.current).selectAll("*").remove();

    const svg = d3.select(ref.current);
    const width = 800;
    const height = 400;

    svg.attr("width", width).attr("height", height);

    const tasks = data.map((d, i) => ({
      ...d,
      index: i,
      startDate: new Date(d.startDate),
      endDate: new Date(d.endDate),
    }));

    const xScale = d3
      .scaleTime()
      .domain([
        d3.min(tasks, (d) => d.startDate) || new Date(),
        d3.max(tasks, (d) => d.endDate) || new Date(),
      ])
      .range([0, width - 100]);

    const yScale = d3
      .scaleBand()
      .domain(tasks.map((d) => d.title))
      .range([0, height])
      .padding(0.1);

    svg
      .append("g")
      .attr("transform", `translate(100, ${height - 30})`)
      .call(
        d3
          .axisBottom(xScale)
          .ticks(d3.timeMonth.every(1))
          .tickFormat(d3.timeFormat("%b %Y"))
      );

    svg
      .append("g")
      .attr("transform", "translate(100, 0)")
      .call(d3.axisLeft(yScale));

    svg
      .append("g")
      .attr("transform", "translate(100, 0)")
      .selectAll("rect")
      .data(tasks)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.startDate))
      .attr("y", (d) => yScale(d.title) || 0)
      .attr("width", (d) => xScale(d.endDate) - xScale(d.startDate))
      .attr("height", yScale.bandwidth())
      .attr(
        "fill",
        () => "#" + Math.floor(Math.random() * 16777215).toString(16)
      );

    svg
      .append("line")
      .attr("x1", xScale(new Date()) + 100)
      .attr("y1", 0)
      .attr("x2", xScale(new Date()) + 100)
      .attr("y2", height - 30)
      .attr("stroke", "blue")
      .attr("stroke-width", 2);
  }, [data]);

  return <svg ref={ref}></svg>;
};

export default GanttChart;
