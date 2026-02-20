export default function Header() {
    return (
        <header className="w-full h-18 bg-gray-800 text-white flex items-center justify-center gap-3">
            <a href="/" className="flex items-center gap-3 hover:opacity-80" title="Página inicial">
                <img src="/cisbaf.png" alt="Logo SAMU" className="h-20 w-20" />
            </a>
        </header>
    );
}