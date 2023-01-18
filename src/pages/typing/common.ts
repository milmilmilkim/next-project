export type Villager = {
  id: number;
  'file-name': string;
  name: {
    'name-USen': string;
    'name-EUen': string;
    'name-EUde': string;
    'name-EUes': string;
    'name-USes': string;
    'name-EUfr': string;
    'name-USfr': string;
    'name-EUit': string;
    'name-EUnl': string;
    'name-CNzh': string;
    'name-TWzh': string;
    'name-JPja': string;
    'name-KRko': string;
    'name-EUru': string;
  };
  personality: string;
  'birthday-string': string;
  birthday: string;
  species: string;
  gender: string;
  'catch-phrase': string;
  icon_uri: string;
  image_uri: string;
  'text-color': string;
  'catch-translations': {
    'catch-CNzh': string;
    'catch-EUde': string;
    'catch-EUen': string;
    'catch-EUes': string;
    'catch-EUfr': string;
    'catch-EUit': string;
    'catch-EUnl': string;
    'catch-EUru': string;
    'catch-JPja': string;
    'catch-KRko': string;
    'catch-TWzh': string;
    'catch-USen': string;
    'catch-USes': string;
    'catch-USfr': string;
  };
};

export enum Species {
  Anteater = '개미핥기',
  Bear = '곰',
  Bird = '새',
  Bull = '황소',
  Cat = '고양이',
  Cub = '아기곰',
  Chicken = '닭',
  Cow = '소',
  Alligator = '악어',
  Deer = '사슴',
  Dog = '개',
  Duck = '오리',
  Elephant = '코끼리',
  Frog = '개구리',
  Goat = '염소',
  Gorilla = '고릴라',
  Hamster = '햄스터',
  Hippo = '하마',
  Horse = '말',
  Koala = '코알라',
  Kangaroo = '캥거루',
  Lion = '사자',
  Monkey = '원숭이',
  Mouse = '쥐',
  Octopus = '문어',
  Ostrich = '타조',
  Eagle = '독수리',
  Penguin = '펭귄',
  Pig = '돼지',
  Rabbit = '토끼',
  Rhino = '코뿔소',
  Sheep = '양',
  Squirrel = '다람쥐',
  Tiger = '호랑이',
  Wolf = '늑대',
}

export enum Personality {
    Lazy = '',
    Jock = '',
    
}
