export default function Footer(): JSX.Element {
  return (
    <footer className="w-full py-10">
      <div className="site-container text-center">

        <div className="flex flex-col items-center mb-6 gap-2">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-light-purple/20 to-transparent" />
          <div className="h-px w-14 bg-gradient-to-r from-transparent via-warm-orange/15 to-transparent" />
        </div>

        <p className="text-small text-text-muted">
          © {new Date().getFullYear()} Пространство. Все права защищены.
        </p>

        <p className="text-small text-text-muted mt-2">
          designed by{" "}
          <a
            href="https://t.me/searchernov"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gradient-purple"
          >
            Anatoly
          </a>
        </p>

      </div>
    </footer>
  );
}
