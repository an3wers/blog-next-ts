import { ImRocket } from "react-icons/im";

const HeroBlock: React.FC = () => {
    return (
        <div className="py-5">
            <div className="container">
                <ImRocket size="3rem" />
                <h1 className="display-1 mt-3">This is a super blog made with next.js and sanity.io</h1>
            </div>
        </div>
    )
}

export default HeroBlock