import clsx from "clsx";

interface TechBadgeProps {
  name: string;
}

export function TechBadge({ name }: TechBadgeProps) {
  return (
    <div className="group flex items-center justify-center rounded-sharp border border-line bg-surface px-4 py-2 transition-all duration-300 hover:-translate-y-[2px] hover:border-accent hover:text-accent">
      <span className="font-body text-[13px] font-medium text-ink transition-colors duration-300 group-hover:text-accent">
        {name}
      </span>
    </div>
  );
}
