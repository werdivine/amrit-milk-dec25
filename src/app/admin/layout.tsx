export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="sanity-admin">
            {children}
        </div>
    )
}
