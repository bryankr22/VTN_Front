import InCache from 'incache'
import axios from 'axios'
import { load } from 'cheerio'
import { DateTime } from 'luxon'

const store = new InCache()

const PICK_AND_PLATE_KEY = 'pick-and-plate'

export declare type PickAndPlateData = {
    bogotaPickAndPlate: [string, string]
    caliPickAndPlate: [string, string]
    medellinPickAndPlate: [string, string]
    barranquillaPickAndPlate: [string, string]
}

const requestForCity = async (city: string): Promise<string> => {
    const cityResponse = await axios.get(`https://www.pyphoy.com/${city}/particulares`)

    const htmlData = await cityResponse.data as string

    const $ = load(htmlData)

    const pickAndPlate = $(
        "div[class^='Card__StyledCard'] div[class^='LicensePlate__StyledLicensePlate']:lt(1)"
    ).text()

    return pickAndPlate
}

const pickAndPlate = async (req, res) => {
    let currentPickAndPlateData = store.get(PICK_AND_PLATE_KEY)

    if (!currentPickAndPlateData) {
        console.log('request')
        const bogotaPickAndPlate = await requestForCity('bogota')
        const caliPickAndPlate = await requestForCity('cali')
        const medellinPickAndPlate = await requestForCity('medellin')
        const barranquillaPickAndPlate = await requestForCity('barranquilla')


        currentPickAndPlateData = {
            bogotaPickAndPlate: ['Bogotá', bogotaPickAndPlate],
            caliPickAndPlate: ['Cali', caliPickAndPlate],
            medellinPickAndPlate: ['Medellin', medellinPickAndPlate],
            barranquillaPickAndPlate: ['Barranquilla', barranquillaPickAndPlate]
        } as PickAndPlateData

        store.set(PICK_AND_PLATE_KEY, currentPickAndPlateData, { expires: DateTime.now().plus({ days: 1 }).set({ hour: 0, minute: 0, second: 0 }).toFormat('yyyy-MM-dd hh:mm:ss') })
    }

    console.log('local')

    return res.status(200).json(currentPickAndPlateData)
}

export default pickAndPlate