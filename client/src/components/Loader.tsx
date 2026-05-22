import type { CSSProperties } from 'react';
import { MoonLoader } from 'react-spinners'

interface LoaderProp {
    loading: boolean
}

function Loader({ loading }: LoaderProp) {
    const color = '#fff';
    const override: CSSProperties = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
        borderColor: "red",
        zIndex: 999,
    };
    return (
        <>
            <MoonLoader
                color={color}
                loading={loading}
                speedMultiplier={2}
                cssOverride={override}
                size={100}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </>
    )
}

export default Loader