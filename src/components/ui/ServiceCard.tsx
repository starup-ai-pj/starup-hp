import { forwardRef } from "react"

interface ServiceCardProps {
    label: string
    title: string
    description?: string
    className?: string
}

const ServiceCard = forwardRef<HTMLDivElement, ServiceCardProps>(
    ({ label, title, description, className = "" }, ref) => {
        return (
            <div
                ref={ref}
                className={`text-white bg-opacity-50 rounded-lg p-4 backdrop-blur-sm ${className}`}
            >
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
            </div>
        )
    }
)

ServiceCard.displayName = "ServiceCard"

export default ServiceCard
