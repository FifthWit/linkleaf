import type { Route } from "./+types/about";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About - React Router App" },
    { name: "description", content: "Learn more about this React Router app." },
  ];
}

export default function About() {
  return (
    <div>
      <h1>About</h1>
      <p>This is the About page of your React Router app.</p>
    </div>
  );
}
