import type { DetailedHTMLProps, HTMLAttributes } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "tito-widget": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & {
          event?: string;
          "discount-code"?: string;
        },
        HTMLElement
      >;
    }
  }
}
