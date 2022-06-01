import { FilledHeartIcon } from "../materials/Icons";

export default function ProjectCard({ description }: { description?: string }) {
  return (
    <div className="group flex flex-col shadow-md hover:shadow-lg duration-200 cursor-pointer">
      <figure className="relative h-52">
        <img
          className="w-full h-full bg-cover"
          src="https://images.gofundme.com/72SyxPr-WsV4Tvxsv5xdrne_0iI=/720x405/https://d2g8igdw686xgo.cloudfront.net/65422451_1653090842335055_r.jpeg"
          alt=""
        />
        {/* progress bar */}
        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-light/50">
          <div className="w-1/2 h-full bg-primary-400" />
          <div className="absolute right-2 -top-3 h-8 w-8 bg-light flex justify-center items-center rounded-full shadow-md text-secondary-200 hover:text-secondary-400 duration-300">
            <FilledHeartIcon width="14" height="14" />
          </div>
        </div>
      </figure>
      <div className="w-full bg-white group-hover:bg-primary-50/10 duration-200 p-5 flex flex-col gap-3">
        <p className="w-fit px-4 py-1 text-xs tracking-wide leading-relaxed bg-primary-400 text-light">
          Medical
        </p>
        <h3 className="text-dark h-[56px] text-lg md:text-xl font-black group-hover:underline line-clamp-2">
          Eliza Road to Recovery amet consectetugr
        </h3>
        {description && (
          <p className="text-lightDark font-medium leading-relaxed tracking-wide text-sm line-clamp-2">
            {description}
          </p>
        )}
        <div className="flex flex-col gap-1 border-t pt-2">
          <p className="text-lightDark text-sm font-medium">
            Last donation 13m ago
          </p>
          <p className="text-link font-bold">
            $29,140 raised <span className="text-lightDark">of $30,000</span>
          </p>
        </div>
      </div>
    </div>
  );
}
