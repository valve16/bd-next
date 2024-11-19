"use client";
import Navbar from "@/app/components/Navbar";
import gstyles from "./Main.module.css"

export default function Main_student() {
    return (
        <>
            <Navbar></Navbar>
            <div className={gstyles.container}>main</div>
        </>
    )
}