import AppService from './modules/app.service'
import {config} from './modules/config'
import './modules/header.component'
import './css/main.css'
import './sass/main.sass'

console.log('Config key:', config.key)

const service = new AppService('Hello World!')
service.log()