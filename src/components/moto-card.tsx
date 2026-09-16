import { Link } from "@tanstack/react-router";
import { formatPrice, type Moto } from "@/lib/moto-data";

export function MotoCard({ moto }: { moto: Moto }) {
  return (
    <Link
      to="/moto/$id"
      params={{ id: moto.id }}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/70"
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-muted">
        <img
          src={moto.image}
          alt={moto.name}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 rounded-full bg-background/85 px-3 py-1 text-xs text-foreground">
          {moto.type}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="font-display text-lg leading-tight font-semibold">{moto.name}</h3>
          <p className="text-sm text-muted-foreground">
            {moto.year} г. · {moto.engine} см³ · {moto.power} л.с.
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <span className="font-display text-xl text-primary">{formatPrice(moto.price)}</span>
          <span className="text-sm text-muted-foreground group-hover:text-foreground">
            Подробнее →
          </span>
        </div>
      </div>
    </Link>
  );
}
