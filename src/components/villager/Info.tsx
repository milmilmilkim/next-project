import { Villager } from '@/typing/villager';
import { Species, Personality } from '@/typing/villager';

type InfoProps = {
  data: Villager;
};
const Info: React.FC<InfoProps> = ({ data }) => {
  const {
    name: { 'name-KRko': nameKr },
    image_uri,
    gender,
    personality,
    'catch-translations': { 'catch-KRko': catchPhrase },
    'text-color': textColor,
    birthday,
    species,
  } = data;
  return (
    <section>
      <h2>{nameKr}</h2>
      <img src={image_uri} alt={nameKr} style={{ borderRadius: '50%' }} />
      <hr />
      <ul>
        <li>
          한마디:{' '}
          <span style={{ color: textColor }} className='outline'>
            {catchPhrase}
          </span>
        </li>
        <li>성별: {gender === 'Femail' ? '여' : '남'}</li>
        <li>
          생일: {`${birthday.split('/')[1]}월 ${birthday.split('/')[0]}일`}
        </li>
        <li>성격: {Personality[personality as keyof typeof Personality]}</li>
        <li>종류: {Species[species as keyof typeof Species]}</li>
      </ul>

      <style jsx>
        {`
          h2 {
            font-size: 32px;
          }

          .outline {
            text-shadow: 0.125em 0 0 #000, -0.125em 0 0 #000, 0 0.125em 0 #000,
              0 -0.125em 0 #000, 0.125em 0.125em 0 #000,
              -0.125em -0.125em 0 #000, 0.125em -0.125em 0 #000,
              -0.125em 0.125em 0 #000, 0 0.125em 0 #000, -0.125em 0.125em 0 #000,
              0.125em 0.125em 0 #000;
          }

          section {
            padding: 10px;
          }
        `}
      </style>
    </section>
  );
};

export default Info;
