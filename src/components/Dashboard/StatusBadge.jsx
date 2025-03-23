const StatusBadge = ({ label, type = "default", icon: Icon }) => {
  const getStatusStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-50 text-green-700 border-green-100"
      case "warning":
        return "bg-yellow-50 text-yellow-700 border-yellow-100"
      case "error":
        return "bg-red-50 text-red-700 border-red-100"
      case "info":
        return "bg-blue-50 text-blue-700 border-blue-100"
      default:
        return "bg-gray-50 text-gray-700 border-gray-100"
    }
  }

  const getIconColor = () => {
    switch (type) {
      case "success":
        return "text-green-500"
      case "warning":
        return "text-yellow-500"
      case "error":
        return "text-red-500"
      case "info":
        return "text-blue-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <div className={`inline-flex items-center px-2 py-0.5 rounded-full border text-xs ${getStatusStyles()}`}>
      {Icon && <Icon className={`w-3 h-3 mr-1 ${getIconColor()}`} />}
      <span className="font-medium">{label}</span>
    </div>
  )
}

export default StatusBadge

