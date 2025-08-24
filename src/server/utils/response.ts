type ResponseFormat<T> = {
  response_code: string;
  response_message: string;
} & T;

export function formatResponse<T extends object>(
  dataKey: keyof T,
  dataValue: T[keyof T],
  response_message = "Success",
  response_code = "0000"
): ResponseFormat<{ [K in keyof T]: T[K] }> {
  return {
    response_code: response_code,
    response_message: response_message,
    [dataKey]: dataValue,
  } as ResponseFormat<{ [K in keyof T]: T[K] }>;
}
