import { Carousel } from "./HomePage/components/Carousel"
import { ExploreTopBooks } from "./HomePage/components/ExploreTopBooks"
import { Heros } from "./HomePage/components/Heros"
import { LibraryServices } from "./HomePage/components/LibraryServices"

export const HomePage = () => {
    return (
        <>
            <ExploreTopBooks />
            <Carousel />
            <Heros />
            <LibraryServices />
        </>
    )
}