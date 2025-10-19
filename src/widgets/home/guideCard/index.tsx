import { Body1, Body2, Body3, Headline1, Title1, Title3 } from '@/shared/ui/Typography';

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
  hoverColor: string;
  iconBg: string;
}

export interface GuideCardProps {
  number: string;
  title: string;
  description: string;
  width: string;
  features: FeatureItem[];
  backgroundColor: string;
}

export default function GuideCard({ cards }: GridCardLayoutProps) {
  return (
    <div className="px-6 pt-12">
      <div className="max-w-8xl  mx-auto">
        <div className="text-center mb-16">
          <Headline1 className="text-slate-800 mb-4">서비스 이용 가이드</Headline1>
          <Body2 className="text-slate-600">그룹에 참여한 후 이벤트에서 일정을 관리해보세요.</Body2>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <GridCard {...cards[0]} />
          <GridCard {...cards[1]} />
        </div>
      </div>
    </div>
  );
}

const GridCard = ({
  number,
  title,
  description,
  features,
  backgroundColor,
  width,
}: GuideCardProps) => {
  return (
    <div className="relative overflow-hidden border-0 shadow-xl bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-xl ">
      <div className={`h-1 bg-gradient-to-r ${backgroundColor}`}></div>

      <div className="p-8">
        <div className="text-center mb-8">
          <div
            className={`w-12 h-12  ${backgroundColor} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
          >
            <span className="text-white-50">{number}</span>
          </div>
          <Title1 className="text-gray-800 mb-2">{title}</Title1>
          <Body1 className="text-gray-600">{description}</Body1>
        </div>
        <div className={`grid ${width} gap-4`}>
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 p-4 rounded-xl ${feature.bgColor} ${feature.hoverColor} transition-colors duration-300`}
            >
              <div
                className={`w-10 h-10  rounded-lg flex items-center justify-center flex-shrink-0 shadow-md bg-white-50`}
              >
                {feature.icon}
              </div>
              <div>
                <Title3 className="text-slate-800 mb-1">{feature.title}</Title3>
                <Body3 className="text-slate-600 leading-relaxed">{feature.description}</Body3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface GridCardLayoutProps {
  cards: GuideCardProps[];
}
