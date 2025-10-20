import { ReactNode } from 'react';

interface TypographyProps {
  children: ReactNode;
  className?: string;
}

// Title
export const Title1 = ({ children, className }: TypographyProps) => (
  <h1 className={`font-bold text-[18px] leading-[24px] ${className}`}>{children}</h1>
);

export const Title2 = ({ children, className }: TypographyProps) => (
  <h2 className={`font-bold text-[16px] leading-[auto] ${className}`}>{children}</h2>
);

export const Title3 = ({ children, className }: TypographyProps) => (
  <h3 className={`font-semibold text-[14px] leading-[auto] ${className}`}>{children}</h3>
);

export const Title4 = ({ children, className }: TypographyProps) => (
  <h4 className={`font-semibold text-[12px] leading-[auto] ${className}`}>{children}</h4>
);

// Headline
export const Headline1 = ({ children, className }: TypographyProps) => (
  <h1 className={`font-extrabold text-[24px] leading-[36px] ${className}`}>{children}</h1>
);

export const Headline2 = ({ children, className }: TypographyProps) => (
  <h2 className={`font-bold text-[20px] leading-[30px] ${className}`}>{children}</h2>
);

// Body
export const Body1 = ({ children, className }: TypographyProps) => (
  <p className={`font-bold text-[16px] leading-[20px] ${className}`}>{children}</p>
);

export const Body2 = ({ children, className }: TypographyProps) => (
  <p className={`font-regular text-[14px] leading-[20px] ${className}`}>{children}</p>
);

export const Body3 = ({ children, className }: TypographyProps) => (
  <p className={`font-regular text-[12px] leading-[auto] ${className}`}>{children}</p>
);

export const Body4 = ({ children, className }: TypographyProps) => (
  <p className={`font-regular text-[12px] leading-[auto] ${className}`}>{children}</p>
);

export const Body5 = ({ children, className }: TypographyProps) => (
  <p className={`font-light text-[10px] leading-[auto] ${className}`}>{children}</p>
);

export const Body4Emphasized = ({ children, className }: TypographyProps) => (
  <p className={`font-bold text-[10px] leading-[15px] ${className}`}>{children}</p>
);

export const Body3Underlined = ({ children, className }: TypographyProps) => (
  <p className={`font-light underline text-[10px] leading-[20px] ${className}`}>{children}</p>
);

// Button
export const Button1 = ({ children, className }: TypographyProps) => (
  <span className={`font-semibold text-[16px] leading-[auto] ${className}`}>{children}</span>
);

export const Button2 = ({ children, className }: TypographyProps) => (
  <span className={`font-semibold text-[14px] leading-[21px] ${className}`}>{children}</span>
);

export const Button3 = ({ children, className }: TypographyProps) => (
  <span className={`font-semibold text-[12px] leading-[auto] ${className}`}>{children}</span>
);
