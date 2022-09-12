import Link from "next/link";

interface BlogCardProps {
  title: string;
  content: string;
  image: string;
  date?: string;
  id: string;
}

export default function BlogCard({
  title,
  content,
  image,
  date,
  id,
}: BlogCardProps) {
  console.log(title)

  return (
    <Link href={`/blog/${id}`} passHref>
      <a>
        <div className="group flex flex-col gap-2">
          <figure className="w-full h-64 overflow-hidden rounded-lg cursor-pointer">
            <img
              className="w-full h-full object-cover"
              src={image}
              alt={title}
            />
          </figure>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-primary">
              {date} • {Math.ceil(content?.trim().split(/\s+/).length / 150)}{" "}
              minutes read
            </p>
            <h4 className="group-hover:underline decoration-link text-lg font-bold text-dark cursor-pointer">
              {title}
            </h4>
            <p className="font-medium text-lightDark line-clamp-2">
              {" "}
              {content?.replace(/(<([^>]+)>)/gi, "")}
            </p>
          </div>
        </div>
      </a>
    </Link>
  );
}
