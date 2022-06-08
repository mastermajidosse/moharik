import { PersonWithHeartIcon } from "../materials/Icons";

export default function DonatorItem() {
  return (
    <div className="flex gap-4">
      <figure className="w-10 h-10 bg-light rounded-full flex justify-center items-center">
        <PersonWithHeartIcon
          width="20"
          height="20"
          className="text-lightDark"
        />
      </figure>
      <div className="flex flex-col text-dark">
        <h3 className="font-bold">Alicia Rodríguez Prieto</h3>
        <p className="text-sm font-medium text-lightDark">€50 • 9 hrs</p>
      </div>
    </div>
  );
}
