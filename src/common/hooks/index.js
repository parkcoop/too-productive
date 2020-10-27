const { default: Axios } = require("axios")
const { useState, useEffect } = require("react")

const useFetch = (method, url, options) => {
    const [response, setResponse] = useState(null)
    useEffect(async () => {
        const res = await Axios[method](url, options)
        setResponse(res)
    }, [])
    return response
}

export default useFetch