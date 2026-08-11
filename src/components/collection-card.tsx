import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type CollectionCardProps = {
  href: string;
  image: string;
  title: string;
  kicker: string;
  description: string;
  tags?: readonly string[];
  position?: string;
  large?: boolean;
};

export function CollectionCard({ href, image, title, kicker, description, tags = [], position = "center", large = false }: CollectionCardProps) {
  return (
    <Link href={href} className={`lore-card ${large ? "lore-card-large" : ""}`}>
      <div className="lore-card-image">
        <Image src={image} alt="" fill sizes={large ? "(max-width: 760px) 100vw, 50vw" : "(max-width: 760px) 100vw, 33vw"} style={{ objectPosition: position }} />
        <span className="lore-card-kicker">{kicker}</span>
      </div>
      <div className="lore-card-copy">
        <div className="lore-card-title"><h2>{title}</h2><ArrowUpRight size={18} /></div>
        <p>{description}</p>
        {tags.length > 0 && <div className="tag-row">{tags.slice(0, 4).map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>}
      </div>
    </Link>
  );
}
