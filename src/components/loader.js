import Loader from "react-js-loader";

export function LoaderS({ color = "#6657da", text="Se încarcă" }) {
    return <Loader type={"ekvalayzer"} bgColor={color} title={text} color={'#ffd218'} size={100} />
}