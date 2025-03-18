export const endpoints = {
  addPullzone: 'pullzone',
  getPullzone: 'pullzone/:id',
  deletePullzone: 'pullzone/:id',
  loadFreeCertificate: (hostname: string) =>
    `pullzone/loadFreeCertificate?hostname=${hostname}`,
  addHostname: (id: number) => `pullzone/${id}/addHostname`,
  removeHostname: (id: number) => `pullzone/${id}/removeHostname`,
  purgeCache: 'pullzone/:id/purgeCache',
};
