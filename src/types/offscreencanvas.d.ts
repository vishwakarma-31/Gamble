interface OffscreenCanvas {
  width: number;
  height: number;
  getContext(contextId: string, options?: any): any;
}