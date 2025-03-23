export const Grid = ({ children, columns = 4, gap = 4, className = "" }) => {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }

  const gapSize = {
    2: "gap-2",
    3: "gap-3",
    4: "gap-4",
    6: "gap-6",
  }

  return <div className={`grid ${gridCols[columns]} ${gapSize[gap]} ${className}`}>{children}</div>
}

export const GridItem = ({ children, colSpan = 1, className = "" }) => {
  const colSpanClasses = {
    1: "",
    2: "sm:col-span-2",
    3: "sm:col-span-2 lg:col-span-3",
    4: "sm:col-span-2 lg:col-span-4",
  }

  return <div className={`${colSpanClasses[colSpan]} ${className}`}>{children}</div>
}

