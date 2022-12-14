import { IProject } from "../interfaces/project";
interface ShareProps {
  target: "facebook" | "twitter" | "instagram" | "whatsapp";
  projectData: IProject;
}

export function share({ projectData, target }: ShareProps): string {
  const { title } = projectData;
  const projectUrl = typeof window !== "undefined" ? window.location.href : "/";

  switch (target) {
    case "facebook":
      return `https://www.facebook.com/sharer.php?u=${projectUrl}`;
    case "instagram":
      return `https://www.instagram.com/?url=${projectUrl}`;
    case "twitter":
      return `https://twitter.com/share?url=${projectUrl}&text=${title}&via=Moharik&hashtags=#Moharik`;
    case "whatsapp":
      return `https://web.whatsapp.com/send?text=${projectUrl}`;
    default:
      return "/";
  }
}
export function shareTeam({
  title,
  target,
}: {
  target: "facebook" | "twitter" | "instagram" | "whatsapp";
  title: string;
}): string {
  const teamUrl = typeof window !== "undefined" ? window.location.href : "/";

  switch (target) {
    case "facebook":
      return `https://www.facebook.com/sharer.php?u=${teamUrl}`;
    case "instagram":
      return `https://www.instagram.com/?url=${teamUrl}`;
    case "twitter":
      return `https://twitter.com/share?url=${teamUrl}&text=${title}&via=Moharik&hashtags=#Moharik`;
    case "whatsapp":
      return `https://web.whatsapp.com/send?text=${teamUrl}`;
    default:
      return "/";
  }
}
