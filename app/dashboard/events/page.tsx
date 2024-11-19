"use client";
import Navbar from "@/app/components/Navbar";
import gstyles from "../main_student/Main.module.css"

export default function page_events() {
    return (
        <>
            <Navbar></Navbar>
            <div className={gstyles.container}>event</div>
        </>
    )
}