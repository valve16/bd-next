import Navbar from "@/app/components/Navbar";
import gstyles from "../main_student/Main.module.css"

export default function page_video() {
    return (
        <>
            <Navbar></Navbar>
            <div className={gstyles.container}>видео</div>
        </>
    )
}