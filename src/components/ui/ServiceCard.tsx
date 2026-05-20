import { forwardRef } from "react"
import TransitionLink from "./TransitionLink"

interface ServiceCardProps {
    label: string
    title: string
    description?: string
    className?: string
    href?: string
    external?: boolean
}

const ServiceCard = forwardRef<HTMLDivElement, ServiceCardProps>(
    ({ label, title, description, className = "", href, external }, ref) => {
        const content = (
            <>
                <span className="text-sm text-gray-300 leading-relaxed mb-6">
                    {label}
                </span>
                <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold mb-4 pb-2 text-white border-b border-white">
                    {title}
                </h3>
                {description && (
                    <p className="text-sm lg:text-base xl:text-lg text-gray-300 leading-relaxed mb-6">
                        {description}
                    </p>
                )}
            </>
        )

        if (href) {
            return (
                <div
                    ref={ref}
                    className={`text-white bg-opacity-50 rounded-lg p-4 backdrop-blur-sm ${className}`}
                >
                    <TransitionLink
                        href={href}
                        className="block"
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                        {content}
                    </TransitionLink>
                </div>
            )
        }

        return (
            <div
                ref={ref}
                className={`text-white bg-opacity-50 rounded-lg p-4 backdrop-blur-sm ${className}`}
            >
                {content}
            </div>
        )
    }
)

ServiceCard.displayName = "ServiceCard"

export default ServiceCard
