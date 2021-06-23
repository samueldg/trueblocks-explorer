export const RootLocation = '/';

export const DashboardLocation = '/dashboard';
export const DashboardOverviewLocation = '/dashboard/overview';
export const DashboardAccountsLocation = '/dashboard/accounts';
export const DashboardAccountsAddressLocationTemplate = '/dashboard/accounts/:address';
export const DashboardAccountsAddressLocation = (address: string) => `/dashboard/accounts/${address}`;
export const AccountTransactionsLocation = '/dashboard/accounts/transactions';
export const AccountTransactionsLocationAddressTemplate = '/dashboard/accounts/transactions/:address';
export const AccountTransactionsLocationAddress = (address: string) => `/dashboard/accounts/transactions/${address}`;
export const AccountFunctionsLocation = '/dashboard/accounts/functions';
export const AccountFunctionsLocationAddressTemplate = '/dashboard/accounts/functions/:address';
export const AccountFunctionsLocationAddress = (address: string) => `/dashboard/accounts/functions/${address}`;
export const AccountEventsLocation = '/dashboard/accounts/events';
export const AccountEventsLocationAddressTemplate = '/dashboard/accounts/events/address';
export const AccountEventsLocationAddress = (address: string) => `/dashboard/accounts/events/${address}`;
export const AccountReconciliationsLocation = '/dashboard/accounts/reconciliations';
export const AccountReconciliationsLocationAddressTemplate = '/dashboard/accounts/reconciliations/address';
export const AccountReconciliationsLocationAddress = (address: string) => `/dashboard/accounts/reconciliations/${address}`;
export const DashboardMonitorsLocation = '/dashboard/monitors';
export const DashboardCollectionsLocation = '/dashboard/collections';
export const DashboardIndexesLocation = '/dashboard/indexes';
export const IndexGridLocation = '/dashboard/indexes/grid';
export const IndexTableLocation = '/dashboard/indexes/table';
export const IndexChartsLocation = '/dashboard/indexes/charts';

export const NamesLocation = '/names';
export const NamesAddressesLocation = '/names/addresses';
export const NamesTagsLocation = '/names/tags';
export const NamesFuncSigsLocation = '/names/funcsigs';
export const NamesEventSigsLocation = '/names/eventsigs';
export const NamesBlocksLocation = '/names/blocks';

export const ExplorerLocation = '/explorer';
export const ExplorerBlocksLocation = '/explorer/blocks';
export const ExplorerTransactionsLocation = '/explorer/transactions';
export const ExplorerReceiptsLocation = '/explorer/receipts';
export const ExplorerLogsLocation = '/explorer/logs';
export const ExplorerTracesLocation = '/explorer/traces';

export const SettingsLocation = '/settings';
export const SettingsScrapersLocation = '/settings/scrapers';
export const SettingsCachesLocation = '/settings/caches';
export const SettingsSkinsLocation = '/settings/skins';
export const SettingsSchemasLocation = '/settings/schemas';

export const SupportLocation = '/support';
export const SupportContactUsLocation = '/support/contact-us';
export const SupportDocumentationLocation = '/support/documentation';
export const SupportHotKeysLocation = '/support/hot-keys';
export const SupportLicensingLocation = '/support/licensing';
export const SupportAboutUsLocation = '/support/about-us';
