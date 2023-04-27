import dotenv from 'dotenv'
import { getMandatoryInt } from './utils/envGetter'
dotenv.config()




export const config = {
    PORT: getMandatoryInt('PORT')
}