import {BrowserRouter, Route, Routes} from 'react-router-dom'
import 'preline'
import Login from '@/modules/login/pages'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
