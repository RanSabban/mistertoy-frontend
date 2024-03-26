import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import '../src/assets/style/main.css'


import { store } from './store/store'
import { AppHeader } from './cmps/AppHeader'
import { HomePage } from './pages/HomePage'
import { About } from './pages/About'
import { ToyIndex } from './pages/ToyIndex'

export function App() {
    return (
        <Provider store={store}>
            <Router>
                <section className="app">
                    <AppHeader />
                    <main className="main-layout">
                        <Routes>
                            <Route element={<HomePage />} path="/" />
                            <Route element={<About />} path="/about" />
                            <Route element={<ToyIndex />} path="/toy" />
                        </Routes>
                    </main>
                </section>
            </Router>
        </Provider>
    )
}