import type { ReactNode } from "react";

interface Props {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export default function AdminPageHeader({ title, subtitle, action }: Props) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28, paddingBottom: 20, borderBottom: "1px solid #e4e4e7" }}>
      <div>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#18181b", margin: 0, letterSpacing: "-0.4px" }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontSize: 13, color: "#71717a", margin: "4px 0 0" }}>
            {subtitle}
          </p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
