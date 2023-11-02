import { Context } from "@/main"
import { useContext } from "react"

const useStore = () => {
    return useContext(Context).store
}
export default useStore