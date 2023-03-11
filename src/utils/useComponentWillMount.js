import { useRef } from "react"

const useComponentWillMount = (callback) => {
    const willMount = useRef(true)
    if (willMount.current) callback()
    willMount.current = false
}

export default useComponentWillMount