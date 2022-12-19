import Link from "next/link"

const AppFooter: React.FC = () => {
    return (
        <footer className="py-4">
            <div className="container">
                Created by <Link target='_blank' href='https://github.com/an3wers'>an3wers</Link>
            </div>
        </footer>
    )
}

export default AppFooter