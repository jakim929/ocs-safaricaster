import { getScaled } from "@/utils/getScaled";

export const getBanner = ({ message }: { message: string }) => {
  return (
    <div
      style={{
        display: "flex",
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        backgroundSize: "100% 100%",
      }}
    >
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: getScaled(26),
          right: getScaled(22),
        }}
      >
        <div
          style={{
            display: "flex",
            borderRadius: getScaled(4),
            border: `${getScaled(1)}px solid #FCFCFC`,
            padding: getScaled(7),
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: getScaled(13),
              borderRadius: getScaled(4),
              backgroundColor: "#E9E7F1",
              color: "#282828",
              paddingLeft: getScaled(9),
              paddingRight: getScaled(9),
              paddingTop: getScaled(12),
              paddingBottom: getScaled(12),
            }}
          >
            <div style={{ display: "flex" }}>{message}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
