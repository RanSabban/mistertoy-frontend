import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import '../src/assets/style/main.css'


import { store } from './store/store'
import { AppHeader } from './cmps/AppHeader'
import { HomePage } from './pages/HomePage'
import { About } from './pages/About'
import { ToyIndex } from './pages/ToyIndex'
import { UserMsg } from './cmps/UserMsg'
import { ToyEdit } from './pages/ToyEdit'
import { ToyDetails } from './pages/ToyDetails'
import { ToyLocations } from './pages/ToyLocations'

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
                            <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
                            <Route element={<ToyEdit />} path="/toy/edit/" />
                            <Route element={<ToyDetails />} path="/toy/details/:toyId" />
                            <Route element={<ToyLocations />} path="/locations" />
                        </Routes>
                    </main>
                    <UserMsg/>
                </section>
            </Router>
        </Provider>
    )
}