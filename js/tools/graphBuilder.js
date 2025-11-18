export default class Graphs {
  constructor(width = 200, height = 200) {
    this.width = width;
    this.height = height;
    this.SVG_NS = "http://www.w3.org/2000/svg";
  }

  createSvg(typeClass) {
    const svg = document.createElementNS(this.SVG_NS, "svg");
    svg.setAttribute("width", this.width);
    svg.setAttribute("height", this.height);
    svg.setAttribute("viewBox", `0 0 ${this.width} ${this.height}`);
    svg.classList.add("graph", typeClass);
    return svg;
  }

  barChart(data = []) {
    const svg = this.createSvg("bar-chart");

    const values = data.map((d) => d.xpAmount);
    const sum = values.reduce((acc, v) => acc + v, 0);

    const padding = 40; // leave space for left scale
    const bottomPadding = 30; // leave space for bottom scale
    const availableWidth = this.width - 2 * padding;
    const availableHeight = this.height - bottomPadding;
    const barWidth = Math.floor((availableWidth / data.length) * 0.7);
    const gap = Math.floor(
      (availableWidth - barWidth * data.length) / (data.length - 1 || 1)
    );

    // find max value for scale
    const maxVal = Math.max(...values);

    // left axis (Y-axis) ticks
    const yTicks = 5;
    for (let i = 0; i <= yTicks; i++) {
      const val = Math.round((maxVal / yTicks) * i);
      const y = availableHeight - (val / maxVal) * availableHeight;

      const tick = document.createElementNS(this.SVG_NS, "text");
      tick.setAttribute("x", padding - 10);
      tick.setAttribute("y", y + 4); // center the text
      tick.setAttribute("text-anchor", "end");
      tick.setAttribute("font-size", "12px");
      tick.textContent = val;
      tick.classList.add("axis-label");

      svg.appendChild(tick);

      // optional tick line
      const line = document.createElementNS(this.SVG_NS, "line");
      line.setAttribute("x1", padding - 5);
      line.setAttribute("x2", padding);
      line.setAttribute("y1", y);
      line.setAttribute("y2", y);
      line.setAttribute("stroke", "#000");
      svg.appendChild(line);
    }

    data.forEach((d, index) => {
      const val = Math.abs(Math.floor((d.xpAmount / maxVal) * availableHeight));
      const bar = document.createElementNS(this.SVG_NS, "rect");
      bar.classList.add("bar");

      const x = padding + index * (barWidth + gap);
      const y = availableHeight - val;

      bar.setAttribute("x", x);
      bar.setAttribute("y", y);
      bar.setAttribute("width", barWidth);
      bar.setAttribute("height", val);
      bar.setAttribute("rx", 4);
      bar.setAttribute("ry", 4);

      if (d.xpAmount < 0) {
        bar.classList.add("negative");
      } else {
        bar.classList.add("positive");
      }

      // tooltip
      const tooltip = document.createElementNS(this.SVG_NS, "text");
      tooltip.setAttribute("x", x + barWidth / 2);
      tooltip.setAttribute("y", y - 5);
      tooltip.setAttribute("text-anchor", "middle");
      tooltip.classList.add("tooltip");
      tooltip.textContent = `${d.projectName}: ${d.xpAmount} XP`;

      bar.addEventListener("mouseenter", () => tooltip.classList.add("show"));
      bar.addEventListener("mouseleave", () =>
        tooltip.classList.remove("show")
      );

      svg.appendChild(bar);
      svg.appendChild(tooltip);

      // bottom axis label
      const label = document.createElementNS(this.SVG_NS, "text");
      label.setAttribute("x", x + barWidth / 2);
      label.setAttribute("y", availableHeight + 15);
      label.setAttribute("text-anchor", "middle");
      label.setAttribute("font-size", "12px");
      label.textContent = d.projectName;
      label.classList.add("axis-label");
      svg.appendChild(label);
    });

    // optional: vertical Y axis line
    const yAxis = document.createElementNS(this.SVG_NS, "line");
    yAxis.setAttribute("x1", padding);
    yAxis.setAttribute("y1", 0);
    yAxis.setAttribute("x2", padding);
    yAxis.setAttribute("y2", availableHeight);
    yAxis.setAttribute("stroke", "#000");
    svg.appendChild(yAxis);

    // optional: bottom X axis line
    const xAxis = document.createElementNS(this.SVG_NS, "line");
    xAxis.setAttribute("x1", padding);
    xAxis.setAttribute("y1", availableHeight);
    xAxis.setAttribute("x2", this.width - padding / 2);
    xAxis.setAttribute("y2", availableHeight);
    xAxis.setAttribute("stroke", "#000");
    svg.appendChild(xAxis);

    return svg;
  }

  lineGraph(data = []) {
    const svg = this.createSvg("line-chart");

    const pts = data
      .map((v, i) => `${20 + i * 25},${this.height - v * 10}`)
      .join(" ");

    const polyline = document.createElementNS(this.SVG_NS, "polyline");
    polyline.classList.add("line");

    polyline.setAttribute("points", pts);

    svg.appendChild(polyline);
    return svg;
  }

  pieChart(values = []) {
    const svg = this.createSvg("pie-chart");

    const total = values.reduce((a, b) => a + b, 0);
    const r = Math.min(this.width, this.height) * 0.35;
    const cx = this.width / 2;
    const cy = this.height / 2;

    let start = 0;

    values.forEach((v, i) => {
      const sliceAngle = (v / total) * Math.PI * 2;
      const end = start + sliceAngle;

      const x1 = cx + r * Math.cos(start);
      const y1 = cy + r * Math.sin(start);
      const x2 = cx + r * Math.cos(end);
      const y2 = cy + r * Math.sin(end);

      const largeArc = sliceAngle > Math.PI ? 1 : 0;

      const path = document.createElementNS(this.SVG_NS, "path");
      path.classList.add("slice", `slice-${i}`);

      path.setAttribute(
        "d",
        `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`
      );

      svg.appendChild(path);
      start = end;
    });

    return svg;
  }
}
