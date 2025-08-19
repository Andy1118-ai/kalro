declare module 'lucide-react' {
  import { FC, SVGProps } from 'react';
  
  export interface IconProps extends SVGProps<SVGSVGElement> {
    size?: string | number;
    strokeWidth?: string | number;
  }
  
  export const Eye: FC<IconProps>;
  export const EyeOff: FC<IconProps>;
  export const Lock: FC<IconProps>;
  export const Mail: FC<IconProps>;
  export const Shield: FC<IconProps>;
  export const ChevronLeft: FC<IconProps>;
  export const ChevronRight: FC<IconProps>;
  export const CheckCircle: FC<IconProps>;
  export const XCircle: FC<IconProps>;
  export const X: FC<IconProps>;
  export const Bell: FC<IconProps>;
  export const Search: FC<IconProps>;
  export const Settings: FC<IconProps>;
  export const User: FC<IconProps>;
  export const LogOut: FC<IconProps>;
  
  // Add other icons as needed
  const LucideReact: {
    [key: string]: FC<IconProps>;
  };
  
  export default LucideReact;
}
