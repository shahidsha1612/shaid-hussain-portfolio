import React from "react";
import { createClient } from "@/prismicio";
import NavBar from "./NavBar";

export default async function Header() {
    const client=createClient();
    const settings = await client.getSingle("settings");
    return(
        <header className="top-0 z-50 mx-auto w-full px-4 md:sticky md:top-4 md:px-8 lg:px-12">
            <NavBar settings={settings}/>

        </header>
    )

    
}