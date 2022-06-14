import Link from "next/link";

interface BlogCardProps {
  title: string;
  description: string;
  image: string;
  date: string;
  idx?: number;
}

export default function BlogCard({
  title,
  description,
  image,
  date,
  idx,
}: BlogCardProps) {
  return (
    <div className="group flex flex-col gap-2">
      <Link href={`/blog/${idx}`}>
        <a className="w-full h-64">
          <figure className="w-full h-full overflow-hidden rounded-lg cursor-pointer">
            <img className="w-full h-full object-cover" src={image} alt="" />
          </figure>
        </a>
      </Link>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-primary">
        {date} • { Math.ceil(description.length / 150)  } minutes read
        </p>
        <Link href={`/blog/${idx}`}>
          <a>
            <h4 className="group-hover:underline decoration-link text-lg font-bold text-dark cursor-pointer">
              {title}
            </h4>
          </a>
        </Link>
        <p className="font-medium text-lightDark line-clamp-2">{description}</p>
      </div>
    </div>
  );
}
