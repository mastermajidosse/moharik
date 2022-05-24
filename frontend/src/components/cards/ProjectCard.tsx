export default function ProjectCard() {
  return (
    <div className="group flex flex-col shadow-md hover:shadow-lg duration-200 cursor-pointer">
      <figure className="relative h-52 overflow-hidden">
        <img
          className="w-full h-full bg-cover"
          src="https://images.gofundme.com/72SyxPr-WsV4Tvxsv5xdrne_0iI=/720x405/https://d2g8igdw686xgo.cloudfront.net/65422451_1653090842335055_r.jpeg"
          alt=""
        />
        {/* progress bar */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-dark/30">
          <div className="w-1/2 h-full bg-primary" />
        </div>
      </figure>
      <div className="w-full h-52 bg-white group-hover:bg-primary-50/10 duration-200 px-2 py-4 flex flex-col gap-2">
        <ul className="text-sm font-medium flex flex-wrap gap-2">
          <li className="w-fit text-primary">Medical,</li>
          <li className="w-fit text-primary">Hisrtry,</li>
          <li className="w-fit text-primary">loream</li>
        </ul>
        <h3 className="text-dark text-lg font-bold">Eliza Road to Recovery</h3>
        <p className="text-lightDark line-clamp-2">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel minus
          repudiandae nisi deleniti quam sequi voluptas libero soluta commodi
          assumenda.
        </p>
        <div className="flex flex-col gap-1 border-t pt-2">
          <p className="text-lightDark text-sm font-medium">
            Last donation 13m ago
          </p>
          <p className="text-dark font-bold">
            $29,140 raised <span className="text-lightDark">of $30,000</span>
          </p>
        </div>
      </div>
    </div>
  );
}
