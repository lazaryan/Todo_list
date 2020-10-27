export interface Reducer<T> {
    [key: string]: (payload: any, state?: T, requestPayload?: any) => any
}
