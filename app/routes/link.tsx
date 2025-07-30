import type { Route } from "./+types/home";
import { useSearchParams } from "react-router";
import type { LinkSchema } from "../types";
import { Badge } from "~/components/badge";
import { BlandLink } from "~/components/blandlink";

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
            <div className="bg-white m-10 rounded-3xl p-8">
              <h1 className="text-center font-semibold text-xl">{(parsed as LinkSchema).name}</h1>
              <ul className="flex flex-row px-2 py-0.5 rounded-full justify-center *:m-2 bg-background-muted">
                {(parsed as LinkSchema).badges.map((badge: any, i: number) => (
                    <Badge key={i} name={badge.name} link={badge.link} image={badge.image} />
                ))}
              </ul>
              <div className="flex flex-col gap-4 mt-8">
                {(parsed as LinkSchema).links &&
                  (parsed as LinkSchema).links.map((link, i) => (
                    <BlandLink
                      key={i}
                      url={link.url}
                      name={link.name}
                      image={link.image}
                    />
                  ))}
              </div>
            </div>
        )
      ) : (
        <div>No JSON param provided.</div>
      )}
    </div>
  );
}
