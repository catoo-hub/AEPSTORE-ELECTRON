module.exports = {
  packagerConfig: {
    asar: true,
    icon: 'F:/Desktop/Pizda/src/AEPSTOREICON.ico',
    win32metadata: {
      ProductName: 'aepstore',
      CompanyName: 'aepstore-team',
      FileDescription: 'AEPStore.fun App',
      appCopyright: 'aepstore-team 2022'
    }
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        iconUrl: 'F:/Desktop/Pizda/src/AEPSTOREICON.ico',
        setupIcon: 'F:/Desktop/Pizda/src/AEPSTOREICON.ico',
        authors: 'aepstore-team',
        skipUpdateIcon: true
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
  ],
};
