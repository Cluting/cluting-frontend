import CommonIdealItem from "./CommonIdealItem";

export default function CommonIdealList({
  ideals,
  onRemove
}: CommonIdealListProps) {
  return (
    <div className="pt-[24px] px-[30px] text-left">
      {ideals.map((ideal) => (
        <CommonIdealItem
          key={ideal.id}
          id={ideal.id}
          text={ideal.text}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
