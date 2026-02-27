import { Link } from "react-router-dom";
import { learningModules } from "../data/modules";

export default function HomePage() {
  const total = learningModules.length;
  const ready = learningModules.filter((item) => item.status === "ready").length;
  const planned = total - ready;

  return (
    <>
      <div className="ambient ambient-a" />
      <div className="ambient ambient-b" />
      <main className="home-shell">
        <aside className="hero-panel">
          <div className="hero-heading">
            <p className="eyebrow">Learning Studio</p>
            <h1>练习中心</h1>
            <p className="hero-text">
              一个模块化学习工具箱。数学、语文、英语页面可独立迭代，同时共享导出与打印能力。
            </p>
          </div>

          <div className="hero-metrics">
            <div>
              <strong>{total}</strong>
              <span>模块总数</span>
            </div>
            <div>
              <strong>{ready}</strong>
              <span>已可用</span>
            </div>
            <div>
              <strong>{planned}</strong>
              <span>规划中</span>
            </div>
          </div>

          <div className="hero-note">
            <p>推荐先用 “竖式计算” 生成可打印练习纸。</p>
            <Link to="/vertical-calc">立即进入 →</Link>
          </div>
        </aside>

        <section className="modules-panel">
          <header className="modules-head">
            <h2>学习模块</h2>
            <p>每个模块都是独立页面，后续扩展只需新增组件和路由。</p>
          </header>

          <div className="module-grid" aria-live="polite">
            {learningModules.map((module, index) => {
              const badgeText = module.status === "ready" ? "可用" : "规划中";
              return (
                <Link
                  key={module.id}
                  className={`module-card ${module.status === "planned" ? "planned" : ""}`}
                  to={module.path}
                >
                  <div className="module-id">{String(index + 1).padStart(2, "0")}</div>
                  <div className="module-top">
                    <h3 className="module-title">{module.title}</h3>
                    <span className={`badge ${module.status}`}>{badgeText}</span>
                  </div>
                  <p className="module-desc">{module.description}</p>
                  <ul className="module-points">
                    {module.points.slice(0, 2).map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <div className="module-tags">
                    {module.tags.map((tag) => (
                      <span key={tag} className="module-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="module-link">进入模块 →</span>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}
