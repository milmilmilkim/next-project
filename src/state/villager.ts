import { atom } from 'jotai';

import { SearchOptions } from '@/typing/villager';

export const searchOptionAtom = atom<SearchOptions>({
  page: 1,
  size: 15,
  keyword: '',
});

