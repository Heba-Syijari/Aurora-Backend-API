export interface IAddCustomHostnameInput {
  pullZoneId: number;
  hostname: string;
}

export interface IAddPullZoneInput {
  name: string;
  originUrl: string;
}

export interface IAddPullZoneResponse {
  id: number;
  hostnameOriginURL: string;
}
