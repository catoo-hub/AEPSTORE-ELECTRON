module.exports = {
  packagerConfig: {
    asar: true,
    icon: 'F:/Desktop/VSPFS/AEPSTORE-ELECTRON/src/AEPSTOREICON.ico',
    win32metadata: {
      ProductName: 'aepstore',
      CompanyName: 'aepstore-team',
      FileDescription: 'AEPStore.fun App',
      appCopyright: 'aepstore-team 2022'
    }
  },
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'catoo-hub',
          name: 'AEPSTORE-ELECTRON'
        },
        authToken: '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'
      }
    }
  ],
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        iconUrl: 'F:/Desktop/VSPFS/AEPSTORE-ELECTRON/src/AEPSTOREICON.ico',
        setupIcon: 'F:/Desktop/VSPFS/AEPSTORE-ELECTRON/src/AEPSTOREICON.ico',
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
