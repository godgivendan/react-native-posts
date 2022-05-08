import * as Font from 'expo-font'
import {DB} from "../db";

export async function bootstrap() {
    try {
        await Font.loadAsync({
            'opensans-regular': require('../../assets/fonts/OpenSans-Regular.ttf'),
            'opensans-bold': require('../../assets/fonts/OpenSans-Bold.ttf'),
        })
        await DB.init()
        console.log('DB started')
    } catch (e) {
        console.log(e)
    }

}