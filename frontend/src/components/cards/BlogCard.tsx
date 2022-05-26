export default function BlogCard() {
  return (
    <div className="group flex flex-col gap-2">
      <figure className="w-full h-64 overflow-hidden rounded-lg cursor-pointer">
        <img
          className="w-full h-full object-cover"
          src="https://www.gofundme.com/c/wp-content/uploads/2020/03/GoFundMe_JaneKhan_043.jpg"
          alt=""
        />
      </figure>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-primary">
          Mar 19, 2020 • 5 minutes
        </p>
        <h4 className="group-hover:underline decoration-link text-lg font-bold text-dark cursor-pointer">
          Coronavirus Relief for Small Businesses: Six Ways to Get Help
        </h4>
        <p className="font-medium text-lightDark line-clamp-2">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Voluptatibus, vel!
        </p>
      </div>
    </div>
  );
}
