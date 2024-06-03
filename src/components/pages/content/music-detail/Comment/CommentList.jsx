import CommentItem from "./CommentItem";

export default function CommentList() {
  return (
    <ul className="w-full flex flex-col gap-6 overflow-y-scroll scrollbar">
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem />
    </ul>
  );
}
