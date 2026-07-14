import { ImageResponse } from "next/og";

export const alt = "Adam IT Corp — Enterprise Software & Oracle Consulting";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(145deg, #0b1c2c 0%, #132538 55%, #0e2438 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
            fontWeight: 600,
            color: "#5dcfb0",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: "#1a8f72",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            A
          </div>
          Adam IT Corp
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              maxWidth: 900,
            }}
          >
            Enterprise software &amp; Oracle consulting
          </div>
          <div
            style={{
              fontSize: 28,
              color: "rgba(255,255,255,0.68)",
              maxWidth: 760,
              lineHeight: 1.4,
            }}
          >
            Practical IT delivery for manufacturing and service organizations
            since 2005.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "rgba(255,255,255,0.5)",
          }}
        >
          <span>adamitcorp.com</span>
          <span>Software · Oracle · Consulting</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
