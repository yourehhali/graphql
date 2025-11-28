export default class Graphs {
  constructor(width = 300, height = 300) {
    this.width = width;
    this.height = height;
    this.SVG_NS = "http://www.w3.org/2000/svg";
    this.margin = { top: 20, right: 20, bottom: 20, left: 20 };
  }

  createSvg(typeClass,width =this.width,height=this.height) {
    const svg = document.createElementNS(this.SVG_NS, "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute("viewBox", `0 0 ${this.width} ${this.height}`);
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    svg.classList.add("graph", typeClass);
    return svg;
  }

  addLegend(svg, items = [], opts = {}) {
    const group = document.createElementNS(this.SVG_NS, "g");
    const fontSize = opts.fontSize ?? 12;
    const gap = opts.gap ?? 24;
    const sw = 16;
    const padX = opts.padX ?? 16;
    const padRight = opts.padRight ?? 16;
    const lineHeight = opts.lineHeight ?? 20;
    const bandHeight = opts.bandHeight ?? 40;
    const position = opts.position ?? "bottom";
    const align = opts.align ?? (opts.center ? "center" : "left"); 

    const approxWidth = (label) => Math.max(12, (label || "").length * (fontSize * 0.6));

    if (position === "right") {
      const maxLabelW = Math.max(...items.map((it) => approxWidth(it.label)));
      const x = this.width - padRight - (sw + 8 + maxLabelW);
      const totalH = items.length * lineHeight;
      let baselineY = Math.round((this.height - totalH) / 2) + lineHeight;

      items.forEach((it) => {
        const shape = it.shape || "rect";
        if (shape === "circle") {
          const c = document.createElementNS(this.SVG_NS, "circle");
          c.setAttribute("cx", x + sw / 2);
          c.setAttribute("cy", baselineY - 6);
          c.setAttribute("r", 7);
          c.setAttribute("fill", "transparent");
          c.setAttribute("stroke", it.color || "#ccc");
          c.setAttribute("stroke-width", 2);
          group.appendChild(c);
        } else if (shape === "line") {
          const ln = document.createElementNS(this.SVG_NS, "line");
          ln.setAttribute("x1", x);
          ln.setAttribute("x2", x + sw);
          ln.setAttribute("y1", baselineY - 6);
          ln.setAttribute("y2", baselineY - 6);
          ln.setAttribute("stroke", it.color || "#ccc");
          ln.setAttribute("stroke-width", 3);
          group.appendChild(ln);
        } else {
          const rect = document.createElementNS(this.SVG_NS, "rect");
          rect.setAttribute("x", x);
          rect.setAttribute("y", baselineY - 14);
          rect.setAttribute("width", sw);
          rect.setAttribute("height", sw);
          rect.setAttribute("fill", it.color || "none");
          rect.setAttribute("stroke", it.color || "#ccc");
          group.appendChild(rect);
        }

        const label = document.createElementNS(this.SVG_NS, "text");
        label.setAttribute("x", x + sw + 8);
        label.setAttribute("y", baselineY - 2);
        label.setAttribute("font-size", String(fontSize));
        label.setAttribute("fill", "#fff");
        label.textContent = it.label || "";
        group.appendChild(label);

        baselineY += lineHeight;
      });

      svg.appendChild(group);
      return svg;
    }

    const availableWidth = this.width - padX - padRight;
    const blocks = items.map((it) => {
      const w = sw + 8 + approxWidth(it.label);
      return w;
    });
    const totalWidth = blocks.reduce((a, b) => a + b, 0) + gap * (blocks.length - 1);

    let baselineY = opts.y ?? (this.height - bandHeight + lineHeight);

    if (totalWidth <= availableWidth && align !== "left") {
      let xStart = padX;
      if (align === "center") xStart = padX + Math.round((availableWidth - totalWidth) / 2);
      if (align === "right") xStart = padX + (availableWidth - totalWidth);

      let x = xStart;
      items.forEach((it, idx) => {
        const blockW = blocks[idx];
        const shape = it.shape || "rect";
        if (shape === "circle") {
          const c = document.createElementNS(this.SVG_NS, "circle");
          c.setAttribute("cx", x + sw / 2);
          c.setAttribute("cy", baselineY - 6);
          c.setAttribute("r", 7);
          c.setAttribute("fill", "transparent");
          c.setAttribute("stroke", it.color || "#ccc");
          c.setAttribute("stroke-width", 2);
          group.appendChild(c);
        } else if (shape === "line") {
          const ln = document.createElementNS(this.SVG_NS, "line");
          ln.setAttribute("x1", x);
          ln.setAttribute("x2", x + sw);
          ln.setAttribute("y1", baselineY - 6);
          ln.setAttribute("y2", baselineY - 6);
          ln.setAttribute("stroke", it.color || "#ccc");
          ln.setAttribute("stroke-width", 3);
          group.appendChild(ln);
        } else {
          const rect = document.createElementNS(this.SVG_NS, "rect");
          rect.setAttribute("x", x);
          rect.setAttribute("y", baselineY - 14);
          rect.setAttribute("width", sw);
          rect.setAttribute("height", sw);
          rect.setAttribute("fill", it.color || "none");
          rect.setAttribute("stroke", it.color || "#ccc");
          group.appendChild(rect);
        }

        const label = document.createElementNS(this.SVG_NS, "text");
        label.setAttribute("x", x + sw + 8);
        label.setAttribute("y", baselineY - 2);
        label.setAttribute("font-size", String(fontSize));
        label.setAttribute("fill", "#fff");
        label.textContent = it.label || "";
        group.appendChild(label);

        x += blockW + gap;
      });

      svg.appendChild(group);
      return svg;
    }

    let x = opts.x ?? padX;
    const maxLineX = this.width - padRight;
    items.forEach((it, idx) => {
      const textLen = (it.label || "").length;
      const approxTextW = Math.max(12, textLen * (fontSize * 0.6));
      const blockW = sw + 8 + approxTextW;
      if (x + blockW > maxLineX) {
        x = padX;
        baselineY += lineHeight;
      }
      const shape = it.shape || "rect";
      if (shape === "circle") {
        const c = document.createElementNS(this.SVG_NS, "circle");
        c.setAttribute("cx", x + sw / 2);
        c.setAttribute("cy", baselineY - 6);
        c.setAttribute("r", 7);
        c.setAttribute("fill", "transparent");
        c.setAttribute("stroke", it.color || "#ccc");
        c.setAttribute("stroke-width", 2);
        group.appendChild(c);
      } else if (shape === "line") {
        const ln = document.createElementNS(this.SVG_NS, "line");
        ln.setAttribute("x1", x);
        ln.setAttribute("x2", x + sw);
        ln.setAttribute("y1", baselineY - 6);
        ln.setAttribute("y2", baselineY - 6);
        ln.setAttribute("stroke", it.color || "#ccc");
        ln.setAttribute("stroke-width", 3);
        group.appendChild(ln);
      } else {
        const rect = document.createElementNS(this.SVG_NS, "rect");
        rect.setAttribute("x", x);
        rect.setAttribute("y", baselineY - 14);
        rect.setAttribute("width", sw);
        rect.setAttribute("height", sw);
        rect.setAttribute("fill", it.color || "none");
        rect.setAttribute("stroke", it.color || "#ccc");
        group.appendChild(rect);
      }
      const label = document.createElementNS(this.SVG_NS, "text");
      label.setAttribute("x", x + sw + 8);
      label.setAttribute("y", baselineY - 2);
      label.setAttribute("font-size", String(fontSize));
      label.setAttribute("fill", "#fff");
      label.textContent = it.label || "";
      group.appendChild(label);
      x += blockW + gap;
    });
    svg.appendChild(group);
    return svg;
  }

  barChart(data = []) {
    const svg = this.createSvg("bar-chart");

    const values = data.map((d) => d.xpAmount);

    const padding = 40;
    const legendBand = 40;
    const bottomPadding = 100 + legendBand;
    const topPadding = 100;
    const availableWidth = this.width - 2 * padding;
    const availableHeight = this.height - bottomPadding - topPadding;
    const barWidth = Math.floor((availableWidth / data.length) * 0.7);
    const gap = Math.floor(
      (availableWidth - barWidth * data.length) / (data.length - 1 || 1)
    );

    const maxVal = Math.max(...values);

    const yTicks = 8;
    for (let i = 0; i <= yTicks; i++) {
      const val = Math.round((maxVal / yTicks) * i);
      const y = availableHeight - (val / maxVal) * availableHeight;

      const tick = document.createElementNS(this.SVG_NS, "text");
      tick.setAttribute("x", padding - 10);
      tick.setAttribute("y", y + 4);
      tick.setAttribute("text-anchor", "end");
      tick.setAttribute("font-size", "12px");
      tick.textContent = val;
      tick.classList.add("axis-label");

      svg.appendChild(tick);

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
      bar.setAttribute("rx", 20);
      bar.setAttribute("ry", 20);

      if (d.xpAmount < 0) {
        bar.classList.add("negative");
        console.log("negative bar:", d);
      } else {
        bar.classList.add("positive");
      }

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

      const label = document.createElementNS(this.SVG_NS, "text");
      label.setAttribute("x", x + barWidth / 2);
      label.setAttribute("y", availableHeight + 15);
      label.setAttribute("text-anchor", "middle");
      label.setAttribute("font-size", "12px");
      label.textContent = d.projectName;
      label.classList.add("axis-label");
      svg.appendChild(label);
    });

    const yAxis = document.createElementNS(this.SVG_NS, "line");
    yAxis.setAttribute("x1", padding);
    yAxis.setAttribute("y1", 0);
    yAxis.setAttribute("x2", padding);
    yAxis.setAttribute("y2", availableHeight);
    yAxis.setAttribute("stroke", "#000");
    svg.appendChild(yAxis);

    const xAxis = document.createElementNS(this.SVG_NS, "line");
    xAxis.setAttribute("x1", padding);
    xAxis.setAttribute("y1", availableHeight);
    xAxis.setAttribute("x2", this.width - padding / 2);
    xAxis.setAttribute("y2", availableHeight);
    xAxis.setAttribute("stroke", "#000");
    svg.appendChild(xAxis);

    this.addLegend(svg, [{label: "Positive", color: "#4caf50"}, {label: "Negative", color: "tomato"}], { align: 'center' });
    return svg;
  }

  lineGraph(data = []) {
    const svg = this.createSvg("line-chart");

    const legendBand = 40;
    const m = 20;
    const effectiveHeight = this.height - legendBand - m;
    const pts = data
      .map((v, i) => `${m + 20 + i * 25},${effectiveHeight - v * 10}`)
      .join(" ");

    const polyline = document.createElementNS(this.SVG_NS, "polyline");
    polyline.classList.add("line");

    polyline.setAttribute("points", pts);

    svg.appendChild(polyline);
    this.addLegend(svg, [{label: "Series", color: "#2196f3", shape: "line"}], { align: 'center' });
    return svg;
  }
  pieChart(values = []) {
    const svg = this.createSvg("pie-chart");

    const total = values.reduce((a, b) => a + b, 0);
    const r = Math.min(this.width, this.height) * 0.35;
    const cx = this.width / 2;
    const cy = this.height / 2;

    let start = 0;
    const colors = ["#F3FFAB", "#FF9999", "#35C88A", "#2196f3", "#ffcc00"];
    const legendItems = [];

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
      const color = colors[i % colors.length];
      path.setAttribute("fill", color);
      path.setAttribute(
        "d",
        `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`
      );

      svg.appendChild(path);
      legendItems.push({ label: `Item ${i + 1}`, color });
      start = end;
    });

    this.addLegend(svg, legendItems, { y: this.height - 20, gap: 24, fontSize: 12, align: 'center' });
    return svg;
  }
  createRadialChart(values = []) {
    const svg = this.createSvg("radial-chart", this.width, this.height);

    const total = values.reduce((a, b) => a + b, 0);
    const legendBand = 40;
    const margin = 24;
    const innerW = this.width - margin * 2;
    const innerH = this.height - margin * 2 - legendBand;
    const cx = margin + innerW / 2;
    const cy = margin + innerH / 2;
    const r = Math.min(innerW, innerH) * 0.45;

    const circumference = 2 * Math.PI * r;

    const bg = document.createElementNS(this.SVG_NS, "circle");
    bg.setAttribute("cx", cx);
    bg.setAttribute("cy", cy);
    bg.setAttribute("r", r);
    bg.setAttribute("stroke", "#ABADBF");
    bg.setAttribute("stroke-width", 22);
    bg.setAttribute("fill", "none");
    svg.appendChild(bg);

    let offset = 0;

    values.forEach((v, i) => {
      const percent = v / total;
      const arcLength = circumference * percent;

      const circle = document.createElementNS(this.SVG_NS, "circle");
      circle.classList.add("arc", `arc-${i}`);

      circle.setAttribute("cx", cx);
      circle.setAttribute("cy", cy);
      circle.setAttribute("r", r);
      circle.setAttribute("fill", "none");
      circle.setAttribute("stroke-width", 46);

      circle.setAttribute(
        "stroke-dasharray",
        `${arcLength} ${circumference - arcLength}`
      );
      circle.setAttribute("transform", `rotate(-90 ${cx} ${cy})`);
      circle.setAttribute("stroke-dashoffset", -offset);

      offset += arcLength;
      svg.appendChild(circle);
    });

    this.addLegend(svg, [{label: "Passed", color: "#F3FFAB"}, {label: "Failed", color: "#FF9999"}, {label: "Bonus", color: "#B7C835"}], { y: this.height - 20, gap: 24, fontSize: 12, align: 'center' });
    return svg;
  }

  coolLineGraph(data = []) {
    const svg = this.createSvg("cool-line-graph");

    const paddingLeft = 90;
    const paddingRight = 90;
    const paddingTop = 10;
    const legendBand = 40;
    const paddingBottom = 10 + legendBand;

    const w = this.width;
    const h = this.height;
    const innerW = w - paddingLeft - paddingRight;
    const innerH = h - paddingTop - paddingBottom;

    let cumulative = 0;
    const cumulativeData = data.map((d) => {
      cumulative += d.xpAmount;
      return { ...d, xpAmount: cumulative };
    });

    const values = cumulativeData.map((d) => d.xpAmount);
    const maxVal = Math.max(...values);
    const minVal = Math.min(...values);
    const range = maxVal - minVal || 1;

    const gridLines = 6;
    for (let i = 0; i <= gridLines; i++) {
      const y = paddingTop + (innerH / gridLines) * i;

      const line = document.createElementNS(this.SVG_NS, "line");
      line.setAttribute("x1", paddingLeft);
      line.setAttribute("x2", w - paddingRight);
      line.setAttribute("y1", y);
      line.setAttribute("y2", y);
      line.setAttribute("stroke", "#454A56");
      line.setAttribute("stroke-width", "2");
      svg.appendChild(line);

      const labelVal = Math.round(maxVal - (range / gridLines) * i);
      const label = document.createElementNS(this.SVG_NS, "text");
      label.setAttribute("x", paddingLeft - 10);
      label.setAttribute("y", y + 4);
      label.style.fill = "#676a87ff";
      label.setAttribute("text-anchor", "end");
      label.setAttribute("font-size", "12px");
      label.textContent =
        labelVal > 1000 ? Math.round(labelVal / 1000) + "kb" : labelVal;
      svg.appendChild(label);
    }

    const xStep = innerW / (cumulativeData.length - 1 || 1);
    const xScale = (i) => paddingLeft + i * xStep;
    const yScale = (v) => paddingTop + innerH - ((v - minVal) / range) * innerH;

    let pathD = cumulativeData
      .map((d, i) => {
        const x = xScale(i);
        const y = yScale(d.xpAmount);
        return i === 0 ? `M ${x},${y}` : `L ${x},${y}`;
      })
      .join(" ");

    const linePath = document.createElementNS(this.SVG_NS, "path");
    linePath.setAttribute("d", pathD);
    linePath.setAttribute("fill", "none");
    linePath.setAttribute("stroke", "#F3FFAB");
    linePath.setAttribute("stroke-width", "1");
    linePath.setAttribute("stroke-linecap", "round");
    linePath.setAttribute("stroke-linejoin", "round");
    svg.appendChild(linePath);

    function addPoint(d, i) {
      const x = xScale(i);
      const y = yScale(d.xpAmount);

      const dot = document.createElementNS(this.SVG_NS, "circle");
      dot.setAttribute("cx", x);
      dot.setAttribute("cy", y);
      dot.setAttribute("r", 8);
      dot.setAttribute("fill", "transparent");
      dot.setAttribute("stroke", "#F3FFAB");
      dot.setAttribute("stroke-width", "2");
      dot.classList.add("data-point");

      const tooltip = document.createElementNS(this.SVG_NS, "rect");
      tooltip.setAttribute("rx", 5);
      tooltip.setAttribute("ry", 5);
      tooltip.classList.add("tooltip-bg");

      const labelGroup = document.createElementNS(this.SVG_NS, "g");
      labelGroup.setAttribute("transform", `translate(${x}, ${y - 40})`);
      labelGroup.classList.add("tooltip-group");

      const projectLabel = document.createElementNS(this.SVG_NS, "text");
      projectLabel.setAttribute("text-anchor", "middle");
      projectLabel.setAttribute("font-size", "16px");
      projectLabel.setAttribute("font-weight", "bold");
      projectLabel.setAttribute("fill", "#000");
      projectLabel.classList.add("tooltip-text");

      projectLabel.textContent =
        d.projectName === "Module" && d.xpAmount < 0
          ? "XP reduction"
          : d.projectName;

      const xpLabel = document.createElementNS(this.SVG_NS, "text");
      xpLabel.setAttribute("text-anchor", "middle");
      xpLabel.setAttribute("font-size", "14px");
      xpLabel.setAttribute("dy", "1.2em");
      xpLabel.classList.add("tooltip-text");
      xpLabel.textContent = `${d.xpAmount} XP`;

      labelGroup.appendChild(projectLabel);
      labelGroup.appendChild(xpLabel);

      const approxWidth =
        Math.max(projectLabel.textContent.length, xpLabel.textContent.length) *
        8;
      const approxHeight = 24 * 2;

      tooltip.setAttribute("width", approxWidth + 24);
      tooltip.setAttribute("height", approxHeight);
      tooltip.setAttribute("x", x - (approxWidth + 24) / 2);
      tooltip.setAttribute("y", y - approxHeight / 2 - 38);
      tooltip.setAttribute("stroke", "#F3FFAB20");
      tooltip.setAttribute("stroke-width", "2");
      tooltip.setAttribute("fill", "#F3FFAB");

      svg.appendChild(dot);
      svg.appendChild(tooltip);
      svg.appendChild(labelGroup);

      tooltip.classList.add("hidden");
      labelGroup.classList.add("hidden");
    }

    cumulativeData.forEach(addPoint.bind(this));

    this.addLegend(
      svg,
      [
        {label: "Cumulative XP", color: "#F3FFAB", shape: "line"},
        {label: "Project (hover for details)", color: "#F3FFAB", shape: "circle"}
      ],
      { align: 'center' }
    );
    return svg;
  }
}
