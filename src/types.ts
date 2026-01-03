export type OutputMode = "plain" | "json";

export type JsonEnvelope<T> = {
  schema: string;
  meta: {
    tool: string;
    version: string;
    timestamp: string;
    request_id?: string;
  };
  summary: string;
  status: "success" | "warn" | "error";
  data: T;
  errors: Array<{ message: string; code?: string }>;
};

export type LogLevel = "quiet" | "info" | "verbose" | "debug";

export type CliGlobals = {
  json: boolean;
  plain: boolean;
  output?: string;
  quiet: boolean;
  verbose: boolean;
  debug: boolean;
  noInput: boolean;
  network: boolean;
  auth: boolean;
  userAgent?: string;
  apiUrl: string;
  actionUrl: string;
  sparqlUrl: string;
  timeout: number;
  retries: number;
  retryBackoff: number;
};
