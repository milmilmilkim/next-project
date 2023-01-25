import { atomWithStorage } from 'jotai/utils';

export const userName = atomWithStorage<string | null>('username', null);
