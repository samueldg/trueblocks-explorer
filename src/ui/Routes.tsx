import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { DashboardView, ExplorerView, NamesView, SettingsView, SupportView } from './views';
const Mousetrap = require('mousetrap');

export const RootLocation = '/';

export const DashboardLocation = '/dashboard';
export const DashboardMonitorsLocation = '/dashboard/monitors';
Mousetrap.bind('s m', function () {
  window.location.href = DashboardMonitorsLocation;
});
export const DashboardAccountsLocation = '/dashboard/accounts';
Mousetrap.bind('s a', function () {
  window.location.href = DashboardAccountsLocation;
});
export const DashboardAccountReconsLocation = '/dashboard/accounts/recons';
export const DashboardAccountFunctionsLocation = '/dashboard/accounts/functions';
export const DashboardAccountGasLocation = '/dashboard/accounts/gas';
export const DashboardAccountTracesLocation = '/dashboard/accounts/traces';
export const DashboardCollectionsLocation = '/dashboard/collections';

export const DashboardAccountsAssetsLocation = '/dashboard/accounts/assets';
export const DashboardAccountsNeighborsLocation = '/dashboard/accounts/neighbors';
export const DashboardAccountsChartsLocation = '/dashboard/accounts/charts';
export const DashboardAccountsFunctionsLocation = '/dashboard/accounts/functions';
export const DashboardAccountsEventsLocation = '/dashboard/accounts/events';

export const NamesLocation = '/names';
Mousetrap.bind('s n', function () {
  window.location.href = NamesLocation;
});
export const NamesAddressesLocation = '/names/addresses';
export const NamesTagsLocation = '/names/tags';
export const NamesFuncSigsLocation = '/names/funcsigs';
export const NamesEventSigsLocation = '/names/eventsigs';
export const NamesBlocksLocation = '/names/blocks';

export const ExplorerLocation = '/explorer';
Mousetrap.bind('s e', function () {
  window.location.href = ExplorerLocation;
});
export const ExplorerBlocksLocation = '/explorer/blocks';
Mousetrap.bind('e b', function () {
  window.location.href = ExplorerBlocksLocation;
});
export const ExplorerTransactionsLocation = '/explorer/transactions';
Mousetrap.bind('e t', function () {
  window.location.href = ExplorerTransactionsLocation;
});
export const ExplorerReceiptsLocation = '/explorer/receipts';
Mousetrap.bind('e r', function () {
  window.location.href = ExplorerReceiptsLocation;
});
export const ExplorerLogsLocation = '/explorer/logs';
Mousetrap.bind('e l', function () {
  window.location.href = ExplorerLogsLocation;
});
export const ExplorerTracesLocation = '/explorer/traces';
Mousetrap.bind('e c', function () {
  window.location.href = ExplorerTracesLocation;
});

export const SettingsLocation = '/settings';
Mousetrap.bind('s s', function () {
  window.location.href = SettingsLocation;
});
export const SettingsScrapersLocation = '/settings/scrapers';
export const SettingsIndexesLocation = '/settings/indexes';
export const SettingsIndexGridLocation = '/settings/indexes/grid';
export const SettingsIndexTableLocation = '/settings/indexes/table';
export const SettingsIndexChartsLocation = '/settings/indexes/charts';
export const SettingsIndexManifestLocation = '/settings/indexes/manifest';
export const SettingsCachesLocation = '/settings/caches';
export const SettingsSkinsLocation = '/settings/skins';
export const SettingsSchemasLocation = '/settings/schemas';

export const SupportLocation = '/support';
export const SupportContactUsLocation = '/support/contact-us';
Mousetrap.bind('s u', function () {
  window.location.href = SupportContactUsLocation;
});
export const SupportDocumentationLocation = '/support/documentation';
export const SupportHotKeysLocation = '/support/hot-keys';
Mousetrap.bind('s k', function () {
  window.location.href = SupportHotKeysLocation;
});
export const SupportLicensingLocation = '/support/licensing';
export const SupportAboutUsLocation = '/support/about-us';

export const DashboardAccountsAddressLocationTemplate = '/dashboard/accounts/:address';
export const DashboardAccountReconsLocationAddressTemplate = '/dashboard/accounts/recons/:address';
export const DashboardAccountFunctionsLocationAddressTemplate = '/dashboard/accounts/functions/:address';
export const DashboardAccountGasLocationAddressTemplate = '/dashboard/accounts/gas/:address';
export const DashboardAccountTracesLocationAddressTemplate = '/dashboard/accounts/traces/:address';

export const DashboardAccountsAddressLocation = (address: string) => `/dashboard/accounts/${address}`;
export const DashboardAccountReconsLocationAddress = (address: string) => `/dashboard/accounts/recons/${address}`;
export const DashboardAccountFunctionsLocationAddress = (address: string) => `/dashboard/accounts/functions/${address}`;
export const DashboardAccountGasLocationAddress = (address: string) => `/dashboard/accounts/gas/${address}`;
export const DashboardAccountTracesLocationAddress = (address: string) => `/dashboard/accounts/traces/${address}`;

export const routes = [
  {
    path: RootLocation,
    exact: true,
    component: DashboardView,
    helpText: 'The dashboard overview page gives you an overview of your holdings among other things.',
  },
  {
    path: DashboardLocation,
    exact: true,
    component: DashboardView,
    helpText: 'The dashboard overview page gives you an overview of your holdings among other things.',
  },
  {
    path: DashboardAccountsLocation,
    exact: true,
    component: DashboardView,
    helpText: 'View the transactional history of an account.',
  },
  {
    path: DashboardAccountsAddressLocationTemplate,
    exact: false,
    component: DashboardView,
  },
  {
    path: DashboardAccountFunctionsLocationAddressTemplate,
    exact: false,
    component: DashboardView,
  },
  {
    path: DashboardAccountGasLocationAddressTemplate,
    exact: false,
    component: DashboardView,
  },
  {
    path: DashboardAccountTracesLocationAddressTemplate,
    exact: false,
    component: DashboardView,
  },
  {
    path: DashboardAccountReconsLocationAddressTemplate,
    exact: false,
    component: DashboardView,
  },
  {
    path: DashboardAccountFunctionsLocation,
    exact: true,
    component: DashboardView,
    helpText: 'View the functional history of an account.',
  },
  {
    path: DashboardAccountGasLocation,
    exact: true,
    component: DashboardView,
    helpText: 'View the event history of an account.',
  },
  {
    path: DashboardAccountTracesLocation,
    exact: true,
    component: DashboardView,
    helpText: 'View the history of traces for the transaction.',
  },
  {
    path: DashboardAccountReconsLocation,
    exact: true,
    component: DashboardView,
    helpText: 'View the reconciliation history of an account.',
  },
  {
    path: DashboardMonitorsLocation,
    exact: true,
    component: DashboardView,
    helpText:
      'Monitors are named addresses that you have indicated are of interest and should be monitored by the scrapers.',
  },
  {
    path: DashboardAccountsAssetsLocation,
    exact: true,
    component: DashboardView,
    helpText: 'See all assets for a given address',
  },
  {
    path: DashboardAccountsNeighborsLocation,
    exact: true,
    component: DashboardView,
    helpText: 'See all assets for a given address',
  },
  {
    path: DashboardAccountsChartsLocation,
    exact: true,
    component: DashboardView,
    helpText: 'See all assets for a given address',
  },
  {
    path: DashboardAccountsFunctionsLocation,
    exact: true,
    component: DashboardView,
    helpText: 'See all assets for a given address',
  },
  {
    path: DashboardAccountsEventsLocation,
    exact: true,
    component: DashboardView,
    helpText: 'See all assets for a given address',
  },
  {
    path: DashboardCollectionsLocation,
    exact: true,
    component: DashboardView,
    helpText: 'Collections allow you to group together multiple monitored addresses.',
  },
  {
    path: NamesLocation,
    exact: true,
    component: NamesView,
    helpText: 'Names are common or known addresses that have been given a name.',
  },
  {
    path: NamesAddressesLocation,
    exact: true,
    component: NamesView,
    helpText: 'Named addresses are a convenient way to keep track of human-readable names for addresses.',
  },
  {
    path: NamesTagsLocation,
    exact: true,
    component: NamesView,
    helpText: 'Tags are groupings used to collect together named addresses.',
  },
  {
    path: NamesFuncSigsLocation,
    exact: true,
    component: NamesView,
    helpText: 'The function signatures tab allows you to add/edit/delete four byte signatures.',
  },
  {
    path: NamesEventSigsLocation,
    exact: true,
    component: NamesView,
    helpText: 'The event signatures tab allows you to add/edit/delete event signatures.',
  },
  {
    path: NamesBlocksLocation,
    exact: true,
    component: NamesView,
    helpText:
      'The blocks tab allows you to name particular blocks such as notable smart contract deployments, hard forks, or other blocks.',
  },
  {
    path: ExplorerLocation,
    exact: true,
    component: ExplorerView,
    helpText: 'View the contents of the TrueBlocks index cache.',
  },
  {
    path: ExplorerBlocksLocation,
    exact: true,
    component: ExplorerView,
    helpText: 'View blockchain block details.',
  },
  {
    path: ExplorerTransactionsLocation,
    exact: true,
    component: ExplorerView,
    helpText: 'View blockchain transaction details.',
  },
  {
    path: ExplorerReceiptsLocation,
    exact: true,
    component: ExplorerView,
    helpText: 'View blockchain receipt details.',
  },
  {
    path: ExplorerLogsLocation,
    exact: true,
    component: ExplorerView,
    helpText: 'View blockchain log details.',
  },
  {
    path: ExplorerTracesLocation,
    exact: true,
    component: ExplorerView,
    helpText: 'View blockchain trace details.',
  },
  {
    path: SettingsLocation,
    exact: true,
    component: SettingsView,
    helpText: 'This screen allows you to adjust the way TrueBlocks two scrapers work.',
  },
  {
    path: SettingsScrapersLocation,
    exact: true,
    component: SettingsView,
    helpText: 'This screen allows you to adjust the way TrueBlocks two scrapers work.',
  },
  {
    path: SettingsIndexesLocation,
    exact: true,
    component: SettingsView,
    helpText: 'View the contents of the TrueBlocks index cache.',
  },
  {
    path: SettingsIndexGridLocation,
    exact: true,
    component: SettingsView,
    helpText: 'Grid view of the index cache.',
  },
  {
    path: SettingsIndexTableLocation,
    exact: true,
    component: SettingsView,
    helpText: 'Table view of the index cache.',
  },
  {
    path: SettingsIndexChartsLocation,
    exact: true,
    component: SettingsView,
    helpText: 'Charts related to the index cache.',
  },
  {
    path: SettingsIndexManifestLocation,
    exact: true,
    component: SettingsView,
    helpText: 'Charts related to the index cache.',
  },
  {
    path: SettingsCachesLocation,
    exact: true,
    component: SettingsView,
    helpText: 'View, edit, clean, recover space from the TrueBlocks caches.',
  },
  {
    path: SettingsSkinsLocation,
    exact: true,
    component: SettingsView,
    helpText: 'Change the skin or them of the application.',
  },
  {
    path: SettingsSchemasLocation,
    exact: true,
    component: SettingsView,
    helpText: 'View and edit the schemas for the various screens and tables.',
  },
  {
    path: SupportLocation,
    exact: true,
    component: SupportView,
    helpText: 'Information on contacting TrueBlocks, LLC.',
  },
  {
    path: SupportContactUsLocation,
    exact: true,
    component: SupportView,
    helpText: 'Information on contacting TrueBlocks, LLC.',
  },
  {
    path: SupportDocumentationLocation,
    exact: true,
    component: SupportView,
    helpText: 'Links to various documentation sites.',
  },
  {
    path: SupportHotKeysLocation,
    exact: true,
    component: SupportView,
    helpText: 'A view of all the hot-keys for the program.',
  },
  {
    path: SupportLicensingLocation,
    exact: true,
    component: SupportView,
    helpText: 'Licensing information about the software.',
  },
  {
    path: SupportAboutUsLocation,
    exact: true,
    component: SupportView,
    helpText: 'A short history of TrueBlocks, LLC.',
  },
];

const CustomRoute = (props: any) => {
  const { path, component, exact } = props;
  return <Route path={path} component={component} exact={exact} />;
};

export const Routes = () => (
  <Switch>
    {routes.map((props) => (
      <CustomRoute key={props.path} {...props} />
    ))}
    <DashboardView />
  </Switch>
);
