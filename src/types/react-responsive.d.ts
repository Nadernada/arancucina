declare module 'react-responsive' {
  export function useMediaQuery(
    query: {
      minWidth?: number;
      maxWidth?: number;
    }
  ): boolean;
}
