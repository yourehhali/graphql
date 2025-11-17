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

    data.forEach((value, index) => {
      const bar = document.createElementNS(this.SVG_NS, "rect");
      bar.classList.add("bar");

      bar.setAttribute("x", 20 + index * 25);
      bar.setAttribute("y", this.height - value * 10);
      bar.setAttribute("width", 20);
      bar.setAttribute("height", value * 10);

      svg.appendChild(bar);
    });

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
