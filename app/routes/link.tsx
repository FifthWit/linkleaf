import type { Route } from "./+types/home";
import { useSearchParams } from "react-router";
import type { LinkSchema } from "../types";

// Type guard for LinkSchema
function isLinkSchema(obj: any): obj is LinkSchema {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.name === "string" &&
    Array.isArray(obj.badges) &&
    obj.badges.every(
      (badge: any) =>
        typeof badge === "object" &&
        badge !== null &&
        typeof badge.name === "string" &&
        typeof badge.link === "string" &&
        typeof badge.image === "string"
    )
  );
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Link() {
  const [searchParams] = useSearchParams();
  const jsonParam = searchParams.get("json");
  let parsed: unknown = null;
  let error: string | null = null;
  let valid: boolean = false;

  if (jsonParam) {
    try {
      parsed = JSON.parse(jsonParam);
      valid = isLinkSchema(parsed);
      if (!valid) {
        error = "JSON does not match LinkSchema";
      }
    } catch (e) {
      error = "Invalid JSON";
    }
  }

  return (
    <div className="w-screen min-h-screen flex flex-row justify-center">
      {jsonParam ? (
        error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <>
            {/* Example: Render badges */}
            <div>
              <h1>{(parsed as LinkSchema).name}</h1>
              <ul>
                {(parsed as LinkSchema).badges.map((badge, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <img src={badge.image} alt={badge.name} className="w-6 h-6" />
                    <a href={badge.link} className="underline">{badge.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )
      ) : (
        <div>No JSON param provided.</div>
      )}
    </div>
  );
}
