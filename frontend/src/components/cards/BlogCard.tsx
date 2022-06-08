import Link from "next/link";

interface BlogCardProps {
  title: string;
  description: string;
  image: string;
  idx?: number;
}

export default function BlogCard({
  title,
  description,
  image,
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
          Mar {19 + 2 * (idx || 0)}, 2020 • {5 + 2 * (idx || 0)} minutes
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
