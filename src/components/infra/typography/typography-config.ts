import { TypographyContext } from "./typography-context.enum";

export const TYPOGRAPHY_CONFIG = {
    [TypographyContext.detailsDrawerTitle]: {
        component: "h2",
        style: {
            fontSize: '1.4rem',
            fontWeight: 600,
        }
    },
    [TypographyContext.detailsDrawerSubtitle]: {
        component: "h2",
        style: {
            fontSize: '1rem',
            fontWeight: 600,
        }
    },
    [TypographyContext.sliderCardTitle]: {
        component: "h2",
        style: {
            fontSize: '0.8rem',
            fontWeight: 600,
        }
    },

} as const;
