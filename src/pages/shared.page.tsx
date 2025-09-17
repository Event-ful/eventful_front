import { Title1, Title2, Title3, Title4, Headline1, Headline2, Body1, Body2, Body4, Body5, Body4Emphasized, Body3Underlined, Button1, Button2, Button3 } from '../shared/ui/Typography';

export default function SharedComponents() {
  return (
    <div className="space-y-4">
      <Title1>Title1</Title1>
      <Title2>Title2</Title2>
      <Title3>Title3 </Title3>
      <Title4>Title4</Title4>

      <Headline1>Headline1</Headline1>
      <Headline2>Headline2</Headline2>

      <Body1>Body1</Body1>
      <Body2>Body2</Body2>
      <Body4>Body4</Body4>
      <Body5>Body5</Body5>
      <Body4Emphasized>Body4Emphasized</Body4Emphasized>
      <Body3Underlined>Body3Underlined</Body3Underlined>

      <Button1>Button1</Button1>
      <Button2>Button2</Button2>
      <Button3>Button3</Button3>
    </div>
  );
}
