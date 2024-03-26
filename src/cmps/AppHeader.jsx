import { NavLink } from "react-router-dom"

export function AppHeader() {
    

    return (
        <header className="app-header flex space-between main-layout">
            <section className="header-container">
                <h1>Toy Store</h1>
                <nav className="app-nav">
                    <nav className="app-nav">
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/toy">Collections</NavLink>
                        <NavLink to="/about">About</NavLink>
                    </nav>
                </nav>
            </section>
        </header>
    )
}