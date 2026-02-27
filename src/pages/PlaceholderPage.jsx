import { Link } from "react-router-dom";

export default function PlaceholderPage({ module }) {
  if (!module) {
    return null;
  }

  return (
    <main className="module-shell module-body">
      <Link className="module-nav" to="/">
        ← 返回练习中心
      </Link>

      <section className="module-head">
        <h1>{module.title}</h1>
        <p>{module.description}</p>
      </section>

      <section className="coming-card">
        <h2>下一步可加</h2>
        <ul>
          {module.points.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
