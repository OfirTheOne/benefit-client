
import { Typography as MuiTypography } from '@mui/material';
import { TypographyContext } from './typography-context.enum';
import { TYPOGRAPHY_CONFIG } from './typography-config';


export interface TypographyProps {
    text: string;
    context: TypographyContext;
    style?: React.CSSProperties;
}

export const Typography: React.FC<TypographyProps> = ({ text, context, style = {} }) => {
    const config = TYPOGRAPHY_CONFIG[context];
    return (<MuiTypography 
        component={config.component} 
        style={{ ...config.style, ...style }}
    >
      { text }
    </MuiTypography>);
}