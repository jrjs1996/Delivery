export const imports = {
  'src/components/Admin/Settings/SettingPage/SettingPage.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-components-admin-settings-setting-page-setting-page" */ 'src/components/Admin/Settings/SettingPage/SettingPage.mdx'
    ),
  'src/components/Admin/Settings/SettingPage/SettingPageInput/SettingPageInput.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-components-admin-settings-setting-page-setting-page-input-setting-page-input" */ 'src/components/Admin/Settings/SettingPage/SettingPageInput/SettingPageInput.mdx'
    ),
}
