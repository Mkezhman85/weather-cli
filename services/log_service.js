import chalk from 'chalk' // common-js бибилиотека
import dedent from 'dedent-js'
import { getKeyValue, TOKEN_DICTIONARY } from './storage_service.js'


const printError = (error) => {
	console.log(chalk.bgRed(' ERROR ') + ' ' + error)
}


const printSuccess = (message) => {
	console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message)
}

const printHelp = () => {
	console.log(
		dedent(`${chalk.bgCyan(` HELP `)}
		Без параметров - вывод погоды
		-s [CITY] для установки города
		-h для вывода помощи
		-t [API_KEY] для сохранения токена
		`)
	)
}

// const printWeather = (res, icon) => {
// 	console.log(
// 		dedent(`${chalk.bgYellow(` WEATHER `)} Погода в городе ${res.name}
// 		${icon} ${res.weather[0].description}
// 		Температура: ${res.main.temp} (ощущается как ${res.main.feels.like})
// 		Влажность: ${res.main.humidity}
// 		Скорость ветра: ${res.wind.speed}
// 		`)
// 	)
// }


const printWeather = (res, icon) => {
	console.log(
		dedent(`${chalk.bgYellow(' WEATHER ')} Погода в городе ${res.name}
		${icon} ${res.weather[0].description}
		Температура: ${res.main.temp} (ощущается как ${res.main.feels_like})
		Влажность: ${res.main.humidity}
		Скорость ветра: ${res.wind.speed}
		`)
	)
}

export { printError, printSuccess, printHelp, printWeather }



