declare module 'react-native-vector-icons/MaterialIcons' {
  import type {ComponentType} from 'react';
  import type {TextProps} from 'react-native';

  type IconProps = TextProps & {
    name: string;
    size?: number;
    color?: string;
  };

  const MaterialIcons: ComponentType<IconProps>;
  export default MaterialIcons;
}

declare module 'react-native-html-to-pdf' {
  type ConvertOptions = {
    html: string;
    fileName?: string;
    directory?: string;
    base64?: boolean;
    width?: number;
    height?: number;
  };

  type ConvertResult = {
    filePath?: string;
    base64?: string;
  };

  export function generatePDF(options: ConvertOptions): Promise<ConvertResult>;
}

declare module 'react-native-share' {
  type ShareOptions = {
    title?: string;
    url?: string;
    type?: string;
    showAppsToView?: boolean;
    failOnCancel?: boolean;
  };

  const Share: {
    open(options: ShareOptions): Promise<unknown>;
  };

  export default Share;
}
