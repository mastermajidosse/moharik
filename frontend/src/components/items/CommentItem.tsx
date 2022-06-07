import { PersonWithHeartIcon } from "../materials/Icons";

export default function CommentItem() {
  return (
    <div className="flex gap-4">
      <figure className="w-10 h-10 bg-primary-100/50 rounded-full flex justify-center items-center">
        <PersonWithHeartIcon
          width="20"
          height="20"
          className="text-primary-500"
        />
      </figure>
      <div className="flex flex-col text-dark">
        <h3 className="font-bold">Alejandra Spring</h3>
        <p className="text-sm font-medium text-lightDark">€50 • 1 mo</p>
        <p className="text-sm font-medium text-lightDark">Todo mi amor</p>
      </div>
    </div>
  );
}
