import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "../../lib/utils"

export function TubelightNavbar({ items, className }) {
    const [activeTab, setActiveTab] = useState(items[0].name)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }

        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const handleClick = (e, item) => {
        e.preventDefault()
        setActiveTab(item.name)

        const element = document.querySelector(item.url)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <div className={cn("tubelight-nav-container", className)}>
            <div className="tubelight-nav-inner">
                {items.map((item) => {
                    const Icon = item.icon
                    const isActive = activeTab === item.name

                    return (
                        <a
                            key={item.name}
                            href={item.url}
                            onClick={(e) => handleClick(e, item)}
                            className={cn(
                                "tubelight-nav-item",
                                isActive && "active",
                            )}
                        >
                            <span className="nav-text">{item.name}</span>
                            <span className="nav-icon">
                                <Icon size={18} strokeWidth={2.5} />
                            </span>
                            {isActive && (
                                <motion.div
                                    layoutId="lamp"
                                    className="tubelight-glow"
                                    initial={false}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 30,
                                    }}
                                >
                                    <div className="glow-top">
                                        <div className="glow-blur glow-blur-1" />
                                        <div className="glow-blur glow-blur-2" />
                                        <div className="glow-blur glow-blur-3" />
                                    </div>
                                </motion.div>
                            )}
                        </a>
                    )
                })}
            </div>
        </div>
    )
}
