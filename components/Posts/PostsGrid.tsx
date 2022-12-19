import { ReactNode } from "react"

const PostsGrid: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className="row row-cols-1 row-cols-md-2 g-4">
            {children}
        </div>
    )
}

export default PostsGrid