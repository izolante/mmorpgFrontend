import 'bootstrap/dist/css/bootstrap.min.css'

import '@popperjs/core/dist/cjs/popper.js'

import 'bootstrap/dist/js/bootstrap.min.js'

import 'bootstrap-icons/font/bootstrap-icons.css'

import Menu from './componentes/Menu'

import Home from './componentes/Home'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Local from './componentes/telas/local/Local'
import Item from './componentes/telas/item/Item'
import Criatura from './componentes/telas/criatura/Criatura'


function App() {

  return (

    <Router>

      <Menu />

      <Routes>

        <Route exact path="/" element={<Home />} />
        <Route exact path="/locais" element={<Local/>}/>
        <Route exact path="/itens" element={<Item/>}/>
        <Route exact path="/criaturas" element={<Criatura/>}/>

      </Routes>

    </Router>

  );

}

export default App;