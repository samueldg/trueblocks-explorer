import {
  DashboardCollectionsLocation, DashboardLocation,
  DashboardOverviewLocation,
  DashboardSystemStatusLocation,
  ExplorerBlocksLocation, ExplorerIndexesLocation, ExplorerLocation,
  ExplorerLogsLocation, ExplorerReceiptsLocation,
  ExplorerTracesLocation, ExplorerTransactionsLocation, NamesAddressesLocation,
  NamesBlocksLocation, NamesLocation,
  NamesMonitorsLocation,
  NamesSignaturesLocation, NamesTagsLocation, RootLocation,
  SettingsCachesLocation, SettingsLocation,
  SettingsSchemasLocation, SettingsScrapersLocation,
  SettingsSkinsLocation,
  SupportAboutUsLocation, SupportContactUsLocation,
  SupportDocumentationLocation,
  SupportHotKeysLocation,
  SupportLicensingLocation, SupportLocation
} from '../../locations';

export const helpRoutes = [
  {
    route: RootLocation,
    helpText: 'You are on the dashboard page.',
  },
  {
    route: DashboardLocation,
    helpText: 'You are on the dashboard page.',
  },
  {
    route: DashboardOverviewLocation,
    helpText: 'The dashboard overview page gives you an overview of your holdings among other things.',
  },
  {
    route: DashboardCollectionsLocation,
    helpText: 'Collections allow you to group together multiple monitored addresses.',
  },
  {
    route: DashboardSystemStatusLocation,
    helpText: 'This screen shows you the system\'s status',
  },
  {
    route: NamesLocation,
    helpText: 'The names component allows you to manage and edit various named objects including addresses, function signatures, and blocks',
  },
  {
    route: NamesMonitorsLocation,
    helpText: 'Monitors are named addresses that you\'ve indicated are \'of interest\' and should be monitored by the scrapers.',
  },
  {
    route: NamesAddressesLocation,
    helpText: 'Named addresses are a convenient way to keep track of human-readable names for addresses.',
  },
  {
    route: NamesTagsLocation,
    helpText: 'Tags are groupings used to collect together named addresses.',
  },
  {
    route: NamesSignaturesLocation,
    helpText: 'The signatures tab allows you to add/edit/delete four byte and event signatures.',
  },
  {
    route: NamesBlocksLocation,
    helpText: 'The blocks tab allows you to name particular blocks such as notable smart contract deployments, hard forks, or other blocks.',
  },
  {
    route: ExplorerLocation,
    helpText: 'The Explorer gives basic block chain explorer options.',
  },
  {
    route: ExplorerIndexesLocation,
    helpText: 'View the contents of the TrueBlocks index cache.',
  },
  {
    route: ExplorerBlocksLocation,
    helpText: 'View blockchain block details.',
  },
  {
    route: ExplorerTransactionsLocation,
    helpText: 'View blockchain transaction details.',
  },
  {
    route: ExplorerReceiptsLocation,
    helpText: 'View blockchain receipt details.',
  },
  {
    route: ExplorerLogsLocation,
    helpText: 'View blockchain log details.',
  },
  {
    route: ExplorerTracesLocation,
    helpText: 'View blockchain trace details.',
  },
  {
    route: SettingsLocation,
    helpText: 'The settings menu item allows you to modify / edit settings.',
  },
  {
    route: SettingsScrapersLocation,
    helpText: 'This screen allows you to adjust the way TrueBlocks two scrapers work.',
  },
  {
    route: SettingsCachesLocation,
    helpText: 'View, edit, clean, recover space from the TrueBlocks caches.',
  },
  {
    route: SettingsSkinsLocation,
    helpText: 'Change the skin of the application you\'re using',
  },
  {
    route: SettingsSchemasLocation,
    helpText: 'View and edit the schemas for the various screens and tables.',
  },
  {
    route: SupportLocation,
    helpText: 'Support provides various access to the explorer\'s screens.',
  },
  {
    route: SupportContactUsLocation,
    helpText: 'Information on contacting TrueBlocks, LLC.',
  },
  {
    route: SupportDocumentationLocation,
    helpText: 'Links to various documentation sites.',
  },
  {
    route: SupportHotKeysLocation,
    helpText: 'A view of all the hot-keys for the program.',
  },
  {
    route: SupportLicensingLocation,
    helpText: 'Licensing information about the software.',
  },
  {
    route: SupportAboutUsLocation,
    helpText: 'A short history of TrueBlocks, LLC.',
  }
];

