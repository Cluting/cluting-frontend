import Common from "./question/Common";
import Individual from "./question/Individual";
import Part from "./question/Part";

export default function QuestionContainer() {
  return (
    <div className="mt-5">
      <Common />
      <Part />
      <Individual />
    </div>
  );
}
