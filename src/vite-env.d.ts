/// <reference types="vite/client" />

declare module '*.css' {
  const content: string;
  export default content;
}

declare module '*.jsx' {
  import * as React from 'react';
  const Component: React.ComponentType<any>;
  export default Component;
}
