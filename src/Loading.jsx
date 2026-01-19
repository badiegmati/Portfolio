import { Ripple } from "react-css-spinners"

function Loading() {
    const gradientMiddleColor = "#8B5CF6"; 
    
    return (
        <div className="h-screen flex justify-center items-center bg-black">
            <Ripple 
                color={gradientMiddleColor}
                size={200}
                thickness={7}
            />
        </div>
    )
}

export default Loading