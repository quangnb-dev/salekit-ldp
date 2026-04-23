import { genRandomBlockId, type SK_BlockStructure } from "@salekit/core";

const SECTION_ID = (() => `${genRandomBlockId()}`)();

export const blankPage: SK_BlockStructure = {
  blocks: {
    page: {
      id: "page",
      type: "page",
      label: "Page",
      cname: "page",
      configs: {
        displayOnDesktop: true,
        displayOnMobile: true,
        displayOnTablet: true,
      },
      bpConfigs: {
        desktop: {
          background: {
            type: "color",
            color: "#f7f7f7",
            image: {
              url: "",
              repeat: "no",
              position: "center center",
              attachment: "scroll",
              fill: "cover",
            },
          },
          color: "blue",
          width: { val: "100", unit: "%" },
          maxWidthPage: { val: "1140", unit: "px" },
          height: { val: "100", unit: "%" },
          zIndex: 2,
          position: "relative",
          pt: { val: "0", unit: "px" },
          pb: { val: "0", unit: "px" },
          pl: { val: "0", unit: "px" },
          pr: { val: "0", unit: "px" },
        },
        tablet: {},
        mobile: {},
      },
    },
    [SECTION_ID]: {
      id: "section",
      type: "section",
      label: "Section",
      cname: "section",
      configs: {
        displayOnDesktop: true,
        displayOnTablet: true,
        displayOnMobile: true,
        animation: {
          type: "none",
          duration: { val: "1", unit: "s" },
          loop: "1",
          delay: { val: "0", unit: "s" },
        },
      },
      bpConfigs: {
        desktop: {
          background: {
            type: "color",
            color: "#ffff",
            image: {
              url: "",
              repeat: "no",
              position: "center center",
              attachment: "scroll",
              fill: "cover",
            },
          },
          boxShadow: undefined,
          border: {
            color: "#000000",
            type: "default",
            top: { val: "0", unit: "px" },
            right: { val: "0", unit: "px" },
            bottom: { val: "0", unit: "px" },
            left: { val: "0", unit: "px" },
            radius: {
              "top-left": { val: "0", unit: "px" },
              "top-right": { val: "0", unit: "px" },
              "bottom-right": { val: "0", unit: "px" },
              "bottom-left": { val: "0", unit: "px" },
            },
          },
          width: {
            type: "default",
            val: "1200",
            unit: "px",
          },
          height: { val: "400", unit: "px" },
          innerDisplay: "grid",
          gridTemplateRows: [{ val: "400", unit: "px" }],
          minHeight: { val: "400", unit: "px" },
          position: "relative",
          spacing: {
            padding: {
              top: { val: "0", unit: "px" },
              right: { val: "0", unit: "px" },
              bottom: { val: "0", unit: "px" },
              left: { val: "0", unit: "px" },
            },
          },
        },
        tablet: {
          width: {
            type: "default",
            val: "736",
            unit: "px",
          },
        },
        mobile: {
          width: {
            type: "default",
            val: "358",
            unit: "px",
          },
        },
      },
    },
  },
  hierarchy: {
    page: [SECTION_ID],
    [SECTION_ID]: [],
  },
};
