export interface SDKOptions {
  debug?: boolean
}

export interface SDK {
  appID: string
  appSecret: string

  options: SDKOptions

  init(appID: string, secret: string): SDK
  config(options: Partial<SDKOptions>): SDK
  create(appID: string, secret: string, options?: Partial<SDKOptions>): SDK
}
