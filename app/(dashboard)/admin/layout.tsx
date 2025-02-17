import React, {FC} from 'react'
import NavBar from "@/components/NavBar";
import Aside from "@/components/Aside";
import DisplayExhibitionCards from "@/components/DisplayCards";
interface AdminLayoutProps {
    children: React.ReactNode
}
const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
    return (
        <div className="h-screen">
            <NavBar/>
            <div className="flex h-5/6">
                <Aside/>
                {children}
            </div>
        </div>
    )
}
export default AdminLayout
