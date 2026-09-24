// The project list the pages render: projects.ts plus live status from the App Store.
import { projects } from './projects.ts';
import { applyStoreStatus, fetchStoreListings } from './store-status.ts';

export const catalog = applyStoreStatus(projects, await fetchStoreListings(projects));
