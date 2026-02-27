import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function spacedDigits(value) {
  return String(value).split("").join(" ");
}

function createAddProblem(maxValue) {
  let a = 0;
  let b = 0;
  const minOperand = maxValue <= 100 ? 6 : 10;

  while (true) {
    a = randInt(minOperand, maxValue - 1);
    b = randInt(1, maxValue - 1);
    if (a + b <= maxValue) {
      break;
    }
  }

  return { a, b, op: "+" };
}

function createSubProblem(maxValue) {
  const minTop = maxValue <= 100 ? 6 : 10;
  const a = randInt(minTop, maxValue);
  const b = randInt(1, a - 1);
  return { a, b, op: "-" };
}

function createProblem(mode, maxValue) {
  if (mode === "add") {
    return createAddProblem(maxValue);
  }

  if (mode === "sub") {
    return createSubProblem(maxValue);
  }

  return Math.random() < 0.5 ? createAddProblem(maxValue) : createSubProblem(maxValue);
}

export default function VerticalCalcPage() {
  const [valueRange, setValueRange] = useState(100);
  const [problemCount, setProblemCount] = useState(24);
  const [opMode, setOpMode] = useState("mixed");
  const [problems, setProblems] = useState([]);
  const [exporting, setExporting] = useState(false);
  const [pngLoading, setPngLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);

  const sheetRef = useRef(null);

  const titleText = useMemo(() => `${valueRange} 以内竖式计算`, [valueRange]);
  const rows = useMemo(() => Math.max(1, Math.ceil(problemCount / 4)), [problemCount]);

  const generateProblems = useCallback(() => {
    const nextProblems = [];
    for (let i = 0; i < problemCount; i += 1) {
      nextProblems.push(createProblem(opMode, valueRange));
    }
    setProblems(nextProblems);
  }, [opMode, problemCount, valueRange]);

  useEffect(() => {
    generateProblems();
  }, [generateProblems]);

  async function captureSheet(scale = 2) {
    if (!sheetRef.current) {
      throw new Error("试卷区域不存在");
    }

    const html2canvasModule = await import("html2canvas");
    const html2canvas = html2canvasModule.default;

    setExporting(true);
    await new Promise((resolve) => requestAnimationFrame(resolve));

    try {
      return await html2canvas(sheetRef.current, {
        scale,
        backgroundColor: "#ffffff",
        useCORS: true
      });
    } finally {
      setExporting(false);
    }
  }

  async function exportPng() {
    setPngLoading(true);
    try {
      const canvas = await captureSheet(2.8);
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = `worksheet-${new Date().toISOString().slice(0, 19).replace(/[T:]/g, "-")}.png`;
      a.click();
    } catch (error) {
      alert(`PNG 导出失败：${error.message}`);
    } finally {
      setPngLoading(false);
    }
  }

  async function exportPdf() {
    setPdfLoading(true);
    try {
      const canvas = await captureSheet(2.6);
      const imgData = canvas.toDataURL("image/png");
      const jspdfModule = await import("jspdf");
      const { jsPDF } = jspdfModule;
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      pdf.addImage(imgData, "PNG", 0, 0, 210, 297, undefined, "FAST");
      pdf.save(`worksheet-${new Date().toISOString().slice(0, 19).replace(/[T:]/g, "-")}.pdf`);
    } catch (error) {
      alert(`PDF 导出失败：${error.message}`);
    } finally {
      setPdfLoading(false);
    }
  }

  return (
    <div className="vertical-page">
      <Link className="module-back" to="/">
        ← 返回练习中心
      </Link>

      <div className="page-bg" />

      <main className="app">
        <section className="toolbar" aria-label="试卷设置">
          <div className="toolbar-title">
            <p className="kicker">Worksheet Studio</p>
            <h1>{titleText}</h1>
          </div>

          <div className="controls">
            <div className="control-grid">
              <label>
                计算范围
                <select
                  value={valueRange}
                  onChange={(event) => setValueRange(Number(event.target.value))}
                >
                  <option value={100}>100 以内</option>
                  <option value={1000}>1000 以内</option>
                </select>
              </label>

              <label>
                题目数量
                <select
                  value={problemCount}
                  onChange={(event) => setProblemCount(Number(event.target.value))}
                >
                  <option value={12}>12 题</option>
                  <option value={16}>16 题</option>
                  <option value={20}>20 题</option>
                  <option value={24}>24 题</option>
                </select>
              </label>

              <label>
                题型
                <select value={opMode} onChange={(event) => setOpMode(event.target.value)}>
                  <option value="mixed">加减混合</option>
                  <option value="add">仅加法</option>
                  <option value="sub">仅减法</option>
                </select>
              </label>
            </div>

            <div className="action-grid">
              <button className="btn solid" onClick={generateProblems}>
                重新生成
              </button>
              <button className="btn" onClick={exportPng} disabled={pngLoading || pdfLoading}>
                {pngLoading ? "导出中..." : "导出 PNG"}
              </button>
              <button className="btn" onClick={exportPdf} disabled={pngLoading || pdfLoading}>
                {pdfLoading ? "导出中..." : "导出 PDF"}
              </button>
              <button className="btn accent" onClick={() => window.print()}>
                打印 A4
              </button>
            </div>
          </div>

          <p className="hint">说明：打印时会自动排版为单页 A4；PDF 为单页导出。</p>
        </section>

        <section className="stage" aria-label="A4 试卷预览">
          <article
            ref={sheetRef}
            className={`sheet ${valueRange === 1000 ? "range-1000" : ""} ${
              exporting ? "exporting" : ""
            }`}
          >
            <header className="sheet-header">
              <h2>{titleText}</h2>
              <div className="meta">
                <span>班级__________</span>
                <span>姓名__________</span>
              </div>
            </header>

            <section className="problem-grid" style={{ "--rows": rows }} aria-live="polite">
              {problems.map((problem, index) => (
                <article key={`${problem.a}-${problem.b}-${index}`} className="problem">
                  <div className="stack">
                    <div className="stack-row">
                      <span className="operator ghost">{problem.op}</span>
                      <span className="num">{spacedDigits(problem.a)}</span>
                    </div>
                    <div className="stack-row">
                      <span className="operator">{problem.op}</span>
                      <span className="num">{spacedDigits(problem.b)}</span>
                    </div>
                    <div className="answer-line" aria-hidden="true" />
                  </div>
                </article>
              ))}
            </section>
          </article>
        </section>
      </main>
    </div>
  );
}
