import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <p className="font-display text-lg font-bold uppercase">
            Moto<span className="text-primary">Drive</span>
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Учебный проект мотосалона. Каталог, подбор модели и заявка на покупку.
          </p>
        </div>

        <div>
          <p className="spec-label">Разделы</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/catalog" className="text-muted-foreground hover:text-primary">
                Каталог мотоциклов
              </Link>
            </li>
            <li>
              <Link to="/request" className="text-muted-foreground hover:text-primary">
                Оставить заявку
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-muted-foreground hover:text-primary">
                О проекте
              </Link>
            </li>
            <li>
              <Link to="/admin" className="text-muted-foreground hover:text-primary">
                Админ-панель
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="spec-label">Проект</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Создатель: Даниель</li>
            <li>Главный разработчик: Сайфулло</li>
            <li>Группа Web25-2Б, АГПК</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © 2026 MotoDrive | Web25-2Б | АГПК
      </div>
    </footer>
  );
}
