import { guideCardsData } from './fetchHome/api/guideData';
import GuideCard from '../../widgets/home/guideCard';
import HomeBanner from '../../widgets/home/homeBanner';

export default function HomeForm() {
  return (
    <div className="bg-gray-50">
      {/* 상단 히어로 섹션 */}
      <HomeBanner />
      {/* 하단 가이드 섹션 */}
      <GuideCard cards={guideCardsData} />
    </div>
  );
}
