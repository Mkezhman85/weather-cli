#!/usr/bin/env node
import { getArgs } from './helpers/args.js'
import { getIcon, getWeather } from './services/api_service.js'
import { printHelp, printSuccess, printError, printWeather } from './services/log_service.js'
import { filePath, getKeyValue, saveKeyValue, TOKEN_DICTIONARY } from './services/storage_service.js'

const saveToken = async (token) => {
	if (!token.length) {
		printError('Не передан token')
		return
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.token, token)
		printSuccess(`Токен сохранен.\nТокен:${token}\nПуть к файлу: ${filePath}`)
	} catch (e) {
		printError(e.message)
	}
}

const saveCity = async (city) => {
	if (!city.length) {
		printError('Не передан город')
		return
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.city, city)
		printSuccess(`Город сохранен.\nГород:${city}`)
	} catch (e) {
		printError(e.message)
	}
}

const getForcast = async () => {
	try {
		const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city)
		const weather = await getWeather(city)
		printWeather(weather, getIcon(weather.weather[0].icon))

	} catch (e) {
		if (e?.response?.status == 404) {
			printError('Неверно указан город')
		} else if (e?.response?.status == 401) {
			printError("Неверно указан токен")	 
		} else {
			printError(e.message)
		}
	}
}

const initCLI = () => {

	const args = getArgs(process.argv)

	if (args.h) {
		// Вывод help
		return printHelp()
	}

	if (args.s) {
		// Сохранить город
		return saveCity(args.s)
	}

	if (args.t) {
		 // Сохранить токен
		return saveToken(args.t)
	}	

	return getForcast()

}



initCLI()