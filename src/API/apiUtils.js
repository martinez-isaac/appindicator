import axios from "axios"
import {API_URL} from "@env"

export const getApiRequest = async (url) => {
    console.log("(GET) 🔎 ", API_URL + url)
    try {
        const res = await axios.get(API_URL + url)

        if (res.status === 200) {
            return res
        } else {
            throw new Error(res.status + " " + res.statusText)
        }
    } catch (error) {
        return { success: false, error: error }
    }
}

