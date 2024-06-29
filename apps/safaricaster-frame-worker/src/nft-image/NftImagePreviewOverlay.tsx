export const NftImagePreviewOverlay = () => {
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
          flexDirection: "row",
          height: "200px",
          width: "100%",
          fontSize: 72,
          color: "white",
          gap: "72px",
          justifyContent: "center",
          position: "absolute",
          bottom: "15%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <div style={{ color: "rgba(255, 255, 255, 0.2)" }}> Network </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "24px",
            }}
          >
            <div
              style={{
                width: "60px", // Set the width of the circle
                height: "60px", // Set the height of the circle
                backgroundColor: "blue",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
              }}
            ></div>
            <div>Base </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            border: "2px solid rgba(255, 255, 255, 0.2)",
            height: "100%",
          }}
        ></div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <div style={{ color: "rgba(255, 255, 255, 0.2)" }}> Mint Price </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "16px",
            }}
          >
            0.00099
            <div
              style={{
                backgroundColor: "#2E2E2E",
                borderRadius: "24px",
                padding: "20px",
                fontSize: "54px",
              }}
            >
              ETH
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
